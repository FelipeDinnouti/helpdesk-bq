const { newCorrelationId } = require('../lib/http');

// Um id por requisição, ecoado no header para rastrear falha até o log.
function correlationId(req, res, next) {
  req.correlationId = newCorrelationId();
  res.set('x-correlation-id', req.correlationId);
  next();
}

module.exports = correlationId;
