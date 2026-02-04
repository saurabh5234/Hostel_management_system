const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middlewares/auth");
const ctrl = require("../controllers/settingsController");

router.get("/", auth, requireRole("admin"), ctrl.getSettings);
router.put("/", auth, requireRole("admin"), ctrl.updateSettings);

module.exports = router;
