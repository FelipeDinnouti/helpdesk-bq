const { Router } = require('express');
const reportController = require('../controllers/report-controller');
const { requireAuth, requireRole } = require('../middlewares/require-auth');

const router = Router();

router.get('/reports/summary', requireAuth, reportController.summary);
router.get('/categories', requireAuth, reportController.listCategories);
router.post('/categories', requireAuth, requireRole('admin'), reportController.createCategory);
router.patch('/categories/:id', requireAuth, requireRole('admin'), reportController.setCategoryActive);
router.post('/users', requireAuth, requireRole('admin'), reportController.createUser);

module.exports = router;
