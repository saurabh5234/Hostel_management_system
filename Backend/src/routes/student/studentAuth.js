const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/student/studentAuthController');
const { auth, requireRole } = require('../../middlewares/auth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', auth, requireRole('student'), ctrl.me);

module.exports = router;
