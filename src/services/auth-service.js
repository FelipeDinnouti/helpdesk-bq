require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { httpError } = require('../middlewares/error-handler');
const users = require('../repositories/user-repository');
const attempts = require('../repositories/login-attempt-repository');

const JWT_SECRET = process.env.JWT_SECRET || 'troque-este-segredo-em-producao';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

// now injetável: o teste de bloqueio avança o relógio sem esperar 10 minutos.
async function login({ email, password }, { now = Date.now } = {}) {
  const normalized = String(email || '').toLowerCase().trim();
  const at = now();

  if (!normalized || typeof password !== 'string' || password.length === 0) {
    throw httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
  }

  const until = attempts.lockedUntil(normalized, at);
  if (until && at < until) {
    throw httpError(423, 'ACCOUNT_LOCKED', 'Acesso temporariamente indisponível.');
  }

  const user = users.findByEmail(normalized);
  const passwordOk =
    user && user.active === 1 && (await bcrypt.compare(password, user.password_hash));

  if (!passwordOk) {
    attempts.record(normalized, false, new Date(at).toISOString());
    // Reconta: a falha que acabou de entrar pode ser a terceira da janela.
    const untilAfter = attempts.lockedUntil(normalized, at);
    if (untilAfter && at < untilAfter) {
      throw httpError(423, 'ACCOUNT_LOCKED', 'Acesso temporariamente indisponível.');
    }
    // Nunca revela se o e-mail existe (US-01).
    throw httpError(401, 'INVALID_CREDENTIALS', 'Credenciais inválidas.');
  }

  attempts.record(normalized, true, new Date(at).toISOString());
  attempts.prune();

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

module.exports = { login };
