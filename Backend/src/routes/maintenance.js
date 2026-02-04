const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middlewares/auth");
const controller = require("../controllers/student/studentComplaintController");

// Admin sees all complaints
router.get("/", auth, requireRole("admin"), controller.getAllComplaints);

// Admin updates status
router.put("/:id", auth, requireRole("admin"), controller.updateStatus);

module.exports = router;