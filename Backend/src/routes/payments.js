const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');

router.get('/', auth, paymentController.list);
router.post('/', auth, requireRole('admin'), paymentController.create);
router.put('/:id', auth, requireRole('admin'), paymentController.update);

module.exports = router;
