const db = require('../../db/db');
const attempts = require('../../src/repositories/login-attempt-repository');

describe('bloqueio de login', () => {
  beforeEach(() => {
    db.exec('DELETE FROM login_attempts');
  });

  test('0, 1 e 2 falhas liberam; a 3ª trava por 10 minutos', () => {
    const t0 = Date.now();
    const at = (ms) => new Date(t0 + ms).toISOString();
    expect(attempts.lockedUntil('a@x.com', t0)).toBeNull();
    attempts.record('a@x.com', false, at(0));
    attempts.record('a@x.com', false, at(60_000));
    expect(attempts.lockedUntil('a@x.com', t0 + 120_000)).toBeNull();
    attempts.record('a@x.com', false, at(120_000));
    const until = attempts.lockedUntil('a@x.com', t0 + 120_000);
    expect(until).toBeGreaterThan(t0 + 120_000);
    expect(until).toBe(t0 + 120_000 + 10 * 60 * 1000);
    // Depois da janela, libera.
    expect(attempts.lockedUntil('a@x.com', until + 1)).toBeNull();
  });
});
