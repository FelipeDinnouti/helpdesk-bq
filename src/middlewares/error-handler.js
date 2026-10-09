const { fail } = require('../lib/http');

// Erros com status/code próprios passam direto; o resto vira 500 genérico.
// Stack e detalhe interno ficam só no log do servidor (RNF05).
// Deve ser o ÚLTIMO middleware da cadeia (apostila, Passo 27).
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const tooLarge = err && err.type === 'entity.too.large';
  const status = tooLarge ? 413 : Number.isInteger(err.status) ? err.status : 500;
  const code = tooLarge
    ? 'PAYLOAD_TOO_LARGE'
    : typeof err.code === 'string'
      ? err.code
      : 'INTERNAL_ERROR';
  const message = tooLarge
    ? 'Requisição muito grande.'
    : status === 500
      ? 'Não foi possível concluir. Use o código de suporte.'
      : err.message || 'Não foi possível concluir. Use o código de suporte.';

  // Log interno: contexto suficiente para investigar pelo correlationId.
  console.error(
    JSON.stringify({
      level: 'error',
      event: 'request.failed',
      correlationId: req.correlationId || null,
      method: req.method,
      route: req.originalUrl,
      status,
      code,
      detail: status === 500 ? String((err && err.stack) || err) : undefined,
    }),
  );

  if (res.headersSent) return;
  fail(res, status, code, message, req.correlationId);
}

function httpError(status, code, message) {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  return err;
}

module.exports = { errorHandler, httpError };
