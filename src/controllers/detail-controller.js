const { ok } = require('../lib/http');
const detailService = require('../services/detail-service');

function sendValidation(req, res, next, err) {
  if (err.code === 'VALIDATION_ERROR') {
    return res.status(400).json({
      error: {
        code: err.code, message: err.message,
        correlationId: req.correlationId, details: err.details || [],
      },
    });
  }
  if (err.code === 'RESOLUTION_COMMENT_REQUIRED') {
    return res.status(409).json({
      error: {
        code: err.code, message: err.message,
        correlationId: req.correlationId, details: [{ field: 'comment', message: err.message }],
      },
    });
  }
  return next(err);
}

async function changeStatus(req, res, next) {
  try {
    ok(res, detailService.changeStatus(req.params.id, req.body || {}, req.user));
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

async function addComment(req, res, next) {
  try {
    ok(res, detailService.addComment(req.params.id, req.body || {}, req.user), 201);
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

async function listComments(req, res, next) {
  try {
    ok(res, detailService.listComments(req.params.id, req.user));
  } catch (err) {
    next(err);
  }
}

async function listHistory(req, res, next) {
  try {
    ok(res, detailService.listHistory(req.params.id, req.user));
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    ok(res, detailService.remove(req.params.id, req.body || {}, req.user));
  } catch (err) {
    sendValidation(req, res, next, err);
  }
}

module.exports = { changeStatus, addComment, listComments, listHistory, remove };
