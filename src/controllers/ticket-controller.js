const { ok } = require('../lib/http');
const ticketService = require('../services/ticket-service');

function sendValidation(req, res, next, err) {
  if (err.code === 'VALIDATION_ERROR') {
    return res.status(400).json({
      error: {
        code: err.code,
        message: err.message,
        correlationId: req.correlationId,
        details: err.details || [],
      },
    });
  }
  return next(err);
}

async function create(req, res, next) {
  try {
    ok(res, ticketService.create(req.body || {}, req.user), 201);
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

async function list(req, res, next) {
  try {
    ok(res, ticketService.list(req.query || {}, req.user));
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

async function getById(req, res, next) {
  try {
    ok(res, ticketService.getById(req.params.id, req.user));
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    ok(res, ticketService.update(req.params.id, req.body || {}, req.user));
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

module.exports = { create, list, getById, update };
