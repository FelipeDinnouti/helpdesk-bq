const request = require('supertest');
const app = require('../../src/app');

let LIA;
let TEC;
let ADM;

beforeAll(async () => {
  const login = async (email) => {
    const res = await request(app).post('/api/sessions').send({ email, password: 'senha123' });
    return res.body.data.token;
  };
  LIA = await login('lia@exemplo.local');
  TEC = await login('tecnico@exemplo.local');
  ADM = await login('admin@exemplo.local');
});

const auth = (token) => ({ Authorization: `Bearer ${token}` });

describe('POST /api/tickets', () => {
  test('cria chamado válido com dono do token, ignorando requester_id do body', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .set(auth(ADM))
      .send({
        title: 'Computador da recepção não inicializa',
        description: 'Ao pressionar o botão, nenhum sinal é exibido no monitor.',
        priority: 'high',
        requester_id: 'u-lia',
      });
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('open');
    expect(res.body.data.requester_id).toBe('u-admin');
  });

  test('título curto, descrição curta e prioridade inválida dão 400 com details', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .set(auth(LIA))
      .send({ title: 'curto', description: 'curta', priority: 'urgente' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details.map((d) => d.field).sort()).toEqual(['description', 'priority', 'title']);
  });

  test('sem token dá 401', async () => {
    const res = await request(app).post('/api/tickets').send({ title: 'x'.repeat(20), description: 'y'.repeat(40), priority: 'low' });
    expect(res.status).toBe(401);
  });
});

describe('GET /api/tickets', () => {
  test('solicitante vê só os seus; técnico vê todos', async () => {
    const lia = await request(app).get('/api/tickets?pageSize=50').set(auth(LIA));
    const tec = await request(app).get('/api/tickets?pageSize=50').set(auth(TEC));
    expect(lia.body.data.total).toBeLessThanOrEqual(tec.body.data.total);
    for (const t of lia.body.data.data) expect(t.requester_id).toBe('u-lia');
  });

  test('filtro combinado funciona e pageSize é cortado em 50', async () => {
    const res = await request(app)
      .get('/api/tickets?status=open&priority=high&pageSize=200')
      .set(auth(TEC));
    expect(res.status).toBe(200);
    expect(res.body.data.pageSize).toBe(50);
    for (const t of res.body.data.data) {
      expect(t.status).toBe('open');
      expect(t.priority).toBe('high');
    }
    expect(res.body.data.total).toBe(res.body.data.data.length);
  });
});

describe('GET /api/tickets/:id', () => {
  test('solicitante lendo chamado alheio recebe 403 sem dados', async () => {
    const created = await request(app)
      .post('/api/tickets')
      .set(auth(ADM))
      .send({ title: 'Chamado do admin para teste de acesso', description: 'Descricao longa o suficiente para passar na validacao.', priority: 'low' });
    const res = await request(app).get(`/api/tickets/${created.body.data.id}`).set(auth(LIA));
    expect(res.status).toBe(403);
    expect(res.body.data).toBeUndefined();
    expect(res.body.error.correlationId).toBeTruthy();
  });
});
