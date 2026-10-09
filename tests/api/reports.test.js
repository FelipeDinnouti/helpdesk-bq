const request = require('supertest');
const app = require('../../src/app');

let LIA;
let TEC;

beforeAll(async () => {
  const login = async (email) => {
    const res = await request(app).post('/api/sessions').send({ email, password: 'senha123' });
    return res.body.data.token;
  };
  LIA = await login('lia@exemplo.local');
  TEC = await login('tecnico@exemplo.local');
});

describe('GET /api/reports/summary', () => {
  test('totais batem com a lista e zeros estão presentes', async () => {
    const summary = await request(app).get('/api/reports/summary').set({ Authorization: `Bearer ${TEC}` });
    const list = await request(app).get('/api/tickets?pageSize=50').set({ Authorization: `Bearer ${TEC}` });
    expect(summary.status).toBe(200);
    expect(summary.body.data.total).toBe(list.body.data.total);
    expect(Object.keys(summary.body.data.by_status).sort()).toEqual(['analysis', 'closed', 'in_progress', 'open', 'resolved']);
    expect(Object.keys(summary.body.data.by_priority).sort()).toEqual(['critical', 'high', 'low', 'medium']);
    const sum = Object.values(summary.body.data.by_status).reduce((a, b) => a + b, 0);
    expect(sum).toBe(summary.body.data.total);
  });

  test('solicitante e técnico divergem quando há chamado alheio', async () => {
    const adminLogin = await request(app).post('/api/sessions').send({ email: 'admin@exemplo.local', password: 'senha123' });
    await request(app)
      .post('/api/tickets')
      .set({ Authorization: `Bearer ${adminLogin.body.data.token}` })
      .send({ title: 'Chamado do admin para comparar totais', description: 'Descricao longa o suficiente para passar na validacao.', priority: 'low' });
    const lia = await request(app).get('/api/reports/summary').set({ Authorization: `Bearer ${LIA}` });
    const tec = await request(app).get('/api/reports/summary').set({ Authorization: `Bearer ${TEC}` });
    expect(tec.body.data.total).toBeGreaterThan(lia.body.data.total);
  });
});
