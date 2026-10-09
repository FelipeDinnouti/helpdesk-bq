const { ok } = require('../lib/http');
const authService = require('../services/auth-service');

async function create(req, res, next) {
  try {
    const { email, password } = req.body || {};
    const session = await authService.login({ email, password });
    ok(res, session);
  } catch (err) {
    if (err.code === 'VALIDATION_ERROR') {
      return res.status(400).json({
        error: {
          code: err.code, message: err.message,
          correlationId: req.correlationId, details: err.details || [],
        },
      });
    }
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const users = require('../repositories/user-repository');
    ok(res, { user: users.findById(req.user.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, me };
