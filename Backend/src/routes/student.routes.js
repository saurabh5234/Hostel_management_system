const express = require('express');
const router = express.Router();

// student sub-routes
router.use('/auth', require('./student/studentAuth'));
router.use("/complaints", require("./student/studentComplaints"));
router.use('/leave', require('./student/studentLeave'));
router.use('/payments', require('./student/studentPayments'));
router.use('/rooms', require('./student/studentRooms'));

module.exports = router;
