// controllers/reportController.js
const Room = require("../models/Room");
const Tenant = require("../models/Tenant");
const Payment = require("../models/Payment");
const Expense = require("../models/Expense");

exports.getAdminReport = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: "occupied" });
    const totalTenants = await Tenant.countDocuments();

    const payments = await Payment.find({ status: "paid" });
    const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);

    const expenses = await Expense.find();
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const profit = totalIncome - totalExpenses;

    res.json({
      totalRooms,
      occupiedRooms,
      totalTenants,
      totalIncome,
      totalExpenses,
      profit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load report" });
  }
};

// Add the missing functions that your routes expect
exports.monthlyReport = async (req, res) => {
  try {
    // Implement monthly report logic here
    // For now, return a placeholder
    res.json({ message: "Monthly report endpoint - implement logic here" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load monthly report" });
  }
};

exports.summary = async (req, res) => {
  try {
    // Implement summary logic here
    // For now, return a placeholder
    res.json({ message: "Summary endpoint - implement logic here" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load summary" });
  }
};