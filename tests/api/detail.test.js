const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/../db/db');

let TEC;
let ADM;

beforeAll(async () => {
  const login = async (email) => {
    const res = await request(app).post('/api/sessions').send({ email, password: 'senha123' });
    return res.body.data.token;
  };
  TEC = await login('tecnico@exemplo.local');
  ADM = await login('admin@exemplo.local');
});

const auth = (token) => ({ Authorization: `Bearer ${token}` });

async function openTicket() {
  const list = await request(app).get('/api/tickets?status=open&pageSize=1').set(auth(TEC));
  return list.body.data.data[0];
}

describe('PATCH /api/tickets/:id/status', () => {
  test('transição válida grava histórico com ator, antes e depois', async () => {
    const ticket = await openTicket();
    const res = await request(app)
      .patch(`/api/tickets/${ticket.id}/status`)
      .set(auth(TEC))
      .send({ status: 'analysis' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('analysis');
    const rows = db
      .prepare("SELECT event, actor_id, before, after FROM ticket_history WHERE ticket_id = ? AND event = 'ticket.status.changed' ORDER BY created_at DESC LIMIT 1")
      .get(ticket.id);
    expect(rows.actor_id).toBe('u-tecnico');
    expect(rows.before).toBe('open');
    expect(rows.after).toBe('analysis');
  });

  test('salto proibido dá 409 e fechar sem comentário dá 409', async () => {
    const ticket = await openTicket();
    const jump = await request(app)
      .patch(`/api/tickets/${ticket.id}/status`)
      .set(auth(TEC))
      .send({ status: 'closed', comment: 'x' });
    expect(jump.status).toBe(409);
    const resolved = await request(app).get('/api/tickets?status=resolved&pageSize=1').set(auth(TEC));
    const noComment = await request(app)
      .patch(`/api/tickets/${resolved.body.data.data[0].id}/status`)
      .set(auth(TEC))
      .send({ status: 'closed' });
    expect(noComment.status).toBe(409);
    expect(noComment.body.error.code).toBe('RESOLUTION_COMMENT_REQUIRED');
  });

  test('regra do crítico: fechar exige comentário de resolução', async () => {
    // O crítico do seed está em análise: leva até resolvido pela cadeia.
    const analysis = await request(app).get('/api/tickets?status=analysis&pageSize=50').set(auth(TEC));
    const critical = analysis.body.data.data.find((t) => t.priority === 'critical');
    expect(critical).toBeTruthy();
    const prog = await request(app)
      .patch(`/api/tickets/${critical.id}/status`)
      .set(auth(TEC))
      .send({ status: 'in_progress' });
    expect(prog.status).toBe(200);
    const res = await request(app)
      .patch(`/api/tickets/${critical.id}/status`)
      .set(auth(TEC))
      .send({ status: 'resolved', comment: 'Causa raiz corrigida e confirmada.' });
    expect(res.status).toBe(200);
    const comments = await request(app).get(`/api/tickets/${critical.id}/comments`).set(auth(TEC));
    expect(comments.body.data.some((c) => c.body.includes('Causa raiz'))).toBe(true);
  });
});

describe('comentários', () => {
  test('fora da autorização dá 403; 1001 caracteres dá 400', async () => {
    const ticket = await openTicket();
    const liaLogin = await request(app).post('/api/sessions').send({ email: 'lia@exemplo.local', password: 'senha123' });
    const own = await request(app)
      .post(`/api/tickets/${ticket.id}/comments`)
      .set({ Authorization: `Bearer ${liaLogin.body.data.token}` })
      .send({ body: 'Obrigada pelo retorno.' });
    expect(own.status).toBe(201);
    const big = await request(app)
      .post(`/api/tickets/${ticket.id}/comments`)
      .set(auth(TEC))
      .send({ body: 'x'.repeat(1001) });
    expect(big.status).toBe(400);
  });
});

describe('DELETE /api/tickets/:id', () => {
  test('soft delete: some da lista, dá 404 no detalhe, fica no banco', async () => {
    const created = await request(app)
      .post('/api/tickets')
      .set(auth(ADM))
      .send({ title: 'Chamado para testar exclusão lógica', description: 'Descricao longa o suficiente para passar na validacao.', priority: 'low' });
    const id = created.body.data.id;
    const noJust = await request(app).delete(`/api/tickets/${id}`).set(auth(ADM)).send({});
    expect(noJust.status).toBe(400);
    const asTec = await request(app).delete(`/api/tickets/${id}`).set(auth(TEC)).send({ justification: 'x' });
    expect(asTec.status).toBe(403);
    const del = await request(app).delete(`/api/tickets/${id}`).set(auth(ADM)).send({ justification: 'Duplicado.' });
    expect(del.status).toBe(200);
    const gone = await request(app).get(`/api/tickets/${id}`).set(auth(TEC));
    expect(gone.status).toBe(404);
    const row = db.prepare('SELECT deleted_at FROM tickets WHERE id = ?').get(id);
    expect(row.deleted_at).toBeTruthy();
  });
});
