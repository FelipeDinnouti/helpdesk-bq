require('dotenv').config();
const jwt = require('jsonwebtoken');
const { httpError } = require('./error-handler');
const users = require('../repositories/user-repository');

const JWT_SECRET = process.env.JWT_SECRET || 'troque-este-segredo-em-producao';

// Autentica o pedido: Bearer JWT válido de usuário ativo.
// Autorização por perfil acontece nos serviços, nunca só aqui.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(httpError(401, 'UNAUTHENTICATED', 'Autenticação necessária.'));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.findById(payload.sub);
    if (!user || user.active !== 1) {
      return next(httpError(401, 'UNAUTHENTICATED', 'Autenticação necessária.'));
    }
    req.user = { id: user.id, role: user.role };
    return next();
  } catch {
    return next(httpError(401, 'UNAUTHENTICATED', 'Autenticação necessária.'));
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(httpError(403, 'FORBIDDEN', 'Ação não autorizada.'));
    }
    return next();
  };
}

module.exports = { requireAuth, requireRole };
