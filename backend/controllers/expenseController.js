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

// Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.userId,
    }).sort({ date: -1 });

    res.status(200).json({
      message: "Expenses retrieved successfully",
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    res.status(500).json({
      message: "Server error while retrieving expenses",
    });
  }
};

// Get a single expense
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      expense,
    });
  } catch (error) {
    console.error("Get expense error:", error);

    res.status(500).json({
      message: "Server error while retrieving expense",
    });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date,
      paymentMethod,
    } = req.body;

    // Find expense belonging to logged-in user
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Update only provided fields
    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (description !== undefined) {
      expense.description = description;
    }

    if (date !== undefined) {
      expense.date = date;
    }

    if (paymentMethod !== undefined) {
      expense.paymentMethod = paymentMethod;
    }

    const updatedExpense = await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Update expense error:", error);

    res.status(500).json({
      message: "Server error while updating expense",
    });
  }
};
// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    // Find expense belonging to logged-in user
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    // Check if expense exists
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Delete the expense
    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    res.status(500).json({
      message: "Server error while deleting expense",
    });
  }
};

// Export all controller functions
module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};