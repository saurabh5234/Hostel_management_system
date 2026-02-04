const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/auth');
const tenantController = require('../controllers/tenantController');

router.get('/', auth, tenantController.list);
router.post('/', auth, requireRole('admin'), tenantController.create);
router.get('/:id', auth, tenantController.get);
router.put('/:id', auth, requireRole('admin'), tenantController.update);
router.delete('/:id', auth, requireRole('admin'), tenantController.remove);

module.exports = router;
