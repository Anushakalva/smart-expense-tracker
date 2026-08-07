const Expense = require("../models/Expense");

// ===============================
// Create Expense
// ===============================
const createExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date,
      paymentMethod,
    } = req.body;

    if (!amount || !category) {
      return res.status(400).json({
        message: "Amount and category are required",
      });
    }

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

// ===============================
// Get All Expenses
// ===============================
const getExpenses = async (req, res) => {
  try {
    console.log("Logged in user:", req.userId);

    const expenses = await Expense.find({
      user: req.userId,
    }).sort({ date: -1 });

    console.log("Expenses found:", expenses);

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

// ===============================
// Get Single Expense
// ===============================
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

// ===============================
// Update Expense
// ===============================
const updateExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date,
      paymentMethod,
    } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (amount !== undefined) expense.amount = amount;
    if (category !== undefined) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date !== undefined) expense.date = date;
    if (paymentMethod !== undefined)
      expense.paymentMethod = paymentMethod;

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

// ===============================
// Delete Expense
// ===============================
const deleteExpense = async (req, res) => {
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

// ===============================
// Export Controllers
// ===============================
module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};