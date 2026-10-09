const { Router } = require('express');
const { ok } = require('../lib/http');

const router = Router();

router.use('/', require('./sessions'));
router.use('/tickets', require('./tickets'));
router.use('/', require('./admin'));

router.get('/health', (req, res) => ok(res, { status: 'ok' }));

module.exports = router;
