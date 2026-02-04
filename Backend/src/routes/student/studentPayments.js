const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/student/studentPaymentController');
const { auth, requireRole } = require('../../middlewares/auth');

router.get('/', auth, requireRole('student'), ctrl.myPayments);
router.get('/due', auth, requireRole('student'), ctrl.duePayments);
router.post('/pay', auth, requireRole('student'), ctrl.pay);

module.exports = router;
