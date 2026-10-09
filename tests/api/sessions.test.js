const request = require('supertest');
const app = require('../../src/app');

async function loginAs(email) {
  const res = await request(app)
    .post('/api/sessions')
    .send({ email, password: 'senha123' });
  return res.body.data.token;
}

describe('POST /api/sessions', () => {
  test('login válido devolve 200 com token e usuário sem hash', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .send({ email: 'lia@exemplo.local', password: 'senha123' });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.user.email).toBe('lia@exemplo.local');
    expect(res.body.data.user.password_hash).toBeUndefined();
  });

  test('senha errada dá 401 sem dizer se o e-mail existe', async () => {
    const wrong = await request(app)
      .post('/api/sessions')
      .send({ email: 'lia@exemplo.local', password: 'errada' });
    const missing = await request(app)
      .post('/api/sessions')
      .send({ email: 'ninguem@exemplo.local', password: 'errada' });
    expect(wrong.status).toBe(401);
    expect(missing.status).toBe(401);
    // Mesmo código e mensagem; só o correlationId difere (é por requisição).
    expect(wrong.body.error.code).toBe(missing.body.error.code);
    expect(wrong.body.error.message).toBe(missing.body.error.message);
    expect(wrong.body.error.correlationId).not.toBe(missing.body.error.correlationId);
  });

  test('terceira falha trava a conta com 423', async () => {
    const email = 'tecnico@exemplo.local';
    await request(app).post('/api/sessions').send({ email, password: 'x1' });
    await request(app).post('/api/sessions').send({ email, password: 'x2' });
    const third = await request(app).post('/api/sessions').send({ email, password: 'x3' });
    expect(third.status).toBe(423);
    expect(third.body.error.code).toBe('ACCOUNT_LOCKED');
    const right = await request(app).post('/api/sessions').send({ email, password: 'senha123' });
    expect(right.status).toBe(423);
  });
});

describe('GET /api/me', () => {
  test('sem token dá 401; com token devolve o usuário', async () => {
    const anon = await request(app).get('/api/me');
    expect(anon.status).toBe(401);
    const token = await loginAs('lia@exemplo.local');
    const me = await request(app).get('/api/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200);
    expect(me.body.data.user.role).toBe('requester');
  });
});
