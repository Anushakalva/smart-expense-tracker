const Expense = require("../models/Expense");

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (!amount || !category) {
      return res.status(400).json({
        message: "Amount and category are required",
      });
    }

    // Create expense for logged-in user
    const expense = await Expense.create({
      user: req.userId,
      amount,
      category,
      description,
      date,
      paymentMethod,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Create expense error:", error);

    res.status(500).json({
      message: "Server error while creating expense",
    });
  }
};

module.exports = {
  createExpense,
};