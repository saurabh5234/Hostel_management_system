const Expense = require("../models/Expense");

// ➕ Add expense
exports.addExpense = async (req, res) => {
  try {
    const { name, category, amount, description, expenseDate } = req.body;

    if (!name || !amount) {
      return res.status(400).json({ message: "Name and amount are required" });
    }

    const month = new Date(expenseDate || Date.now())
      .toISOString()
      .slice(0, 7); // YYYY-MM

    const expense = await Expense.create({
      name,
      category,
      amount,
      description,
      expenseDate,
      month,
      createdBy: req.user._id
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// 📋 Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .sort({ expenseDate: -1 });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
