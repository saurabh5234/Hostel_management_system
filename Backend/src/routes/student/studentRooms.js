const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/student/studentRoomController');
const { auth } = require('../../middlewares/auth');

// ✅ Correct route
router.get('/my-room', auth, ctrl.getMyRoom);

// optional
router.get('/', ctrl.listRooms);
router.post('/apply', auth, ctrl.applyRoom);

module.exports = router;
