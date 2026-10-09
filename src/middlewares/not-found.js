const { fail } = require('../lib/http');

// Rota que não existe: 404 no envelope, sem vazar nada.
function notFound(req, res) {
  fail(res, 404, 'NOT_FOUND', 'Recurso não encontrado.', req.correlationId);
}

module.exports = notFound;
