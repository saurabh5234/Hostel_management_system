const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        'electricity',
        'water',
        'maintenance',
        'repair',
        'salary',
        'food',
        'internet',
        'other'
      ],
      default: 'other'
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    expenseDate: {
      type: Date,
      default: Date.now
    },

    month: {
      type: String, // e.g. "2025-02"
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // admin who added expense
      required: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Expense', ExpenseSchema);
