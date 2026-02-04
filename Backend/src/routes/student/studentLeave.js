const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/student/studentLeaveController');
const { auth, requireRole } = require('../../middlewares/auth');

router.post('/apply', auth, requireRole('student'), ctrl.applyLeave);
router.get('/', auth, requireRole('student'), ctrl.myLeaves);
router.get('/:id', auth, requireRole('student'), ctrl.getLeave);

module.exports = router;
