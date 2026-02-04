const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middlewares/auth");
const expenseController = require("../controllers/expenseController");

// ADMIN only
router.post("/", auth, requireRole("admin"), expenseController.addExpense);
router.get("/", auth, requireRole("admin"), expenseController.getExpenses);

module.exports = router;
