const { Router } = require('express');
const sessionController = require('../controllers/session-controller');
const { requireAuth } = require('../middlewares/require-auth');

const router = Router();

router.post('/sessions', sessionController.create);
router.get('/me', requireAuth, sessionController.me);

module.exports = router;
