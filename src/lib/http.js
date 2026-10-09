const { randomBytes } = require('node:crypto');

// Formato travado em G10: req_ + 12 hex.
function newCorrelationId() {
  return `req_${randomBytes(6).toString('hex')}`;
}

// Resposta de sucesso: { data }.
function ok(res, data, status = 200) {
  return res.status(status).json({ data });
}

// Resposta de erro: { error: { code, message, correlationId } }.
// Mensagem externa nunca carrega detalhe interno (stack, SQL, token).
function fail(res, status, code, message, correlationId) {
  return res.status(status).json({
    error: { code, message, correlationId: correlationId || null },
  });
}

module.exports = { newCorrelationId, ok, fail };
