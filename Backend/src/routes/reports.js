// routes/reports.js
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middlewares/auth");
const reportController = require("../controllers/reportController");

// Use getAdminReport instead of monthlyReport
router.get("/admin", auth, requireRole("admin"), reportController.getAdminReport);

// If you need summary too, either create it or remove this line
// router.get("/summary", auth, requireRole("admin"), reportController.summary);

module.exports = router;