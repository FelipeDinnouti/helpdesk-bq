const { ok } = require('../lib/http');
const reports = require('../services/report-service');
const admin = require('../services/admin-service');

function validation(res, req, err) {
  if (err.code === 'VALIDATION_ERROR') {
    return res.status(400).json({
      error: { code: err.code, message: err.message, correlationId: req.correlationId, details: err.details || [] },
    });
  }
  return null;
}

async function summary(req, res, next) {
  try {
    ok(res, reports.summary(req.query || {}, req.user));
  } catch (err) {
    if (!validation(res, req, err)) next(err);
  }
}

async function listCategories(req, res, next) {
  try {
    ok(res, reports.listCategories());
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    ok(res, reports.createCategory((req.body || {}).name), 201);
  } catch (err) {
    if (!validation(res, req, err)) next(err);
  }
}

async function setCategoryActive(req, res, next) {
  try {
    ok(res, reports.setCategoryActive(req.params.id, (req.body || {}).active !== false));
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    ok(res, admin.createUser(req.body || {}), 201);
  } catch (err) {
    if (!validation(res, req, err)) next(err);
  }
}

module.exports = { summary, listCategories, createCategory, setCategoryActive, createUser };
