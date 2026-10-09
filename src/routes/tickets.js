const { Router } = require('express');
const ticketController = require('../controllers/ticket-controller');
const detailController = require('../controllers/detail-controller');
const { requireAuth } = require('../middlewares/require-auth');

const router = Router();

router.post('/', requireAuth, ticketController.create);
router.get('/', requireAuth, ticketController.list);
router.get('/:id', requireAuth, ticketController.getById);
router.patch('/:id', requireAuth, ticketController.update);
router.patch('/:id/status', requireAuth, detailController.changeStatus);
router.get('/:id/comments', requireAuth, detailController.listComments);
router.post('/:id/comments', requireAuth, detailController.addComment);
router.get('/:id/history', requireAuth, detailController.listHistory);
router.delete('/:id', requireAuth, detailController.remove);

module.exports = router;
