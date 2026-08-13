
const Expense = require("../models/Expense");
const mongoose = require("mongoose");
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

    // Validate required fields
    if (amount === undefined || amount === null || amount === "") {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    // Validate amount
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    // Validate payment method
    const allowedPaymentMethods = [
      "UPI",
      "Cash",
      "Credit Card",
      "Debit Card",
      "Net Banking",
      "Other",
    ];

    if (
      paymentMethod &&
      !allowedPaymentMethods.includes(paymentMethod)
    ) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    const expense = await Expense.create({
      user: req.userId,
      amount: numericAmount,
      category: category.trim(),
      description: description?.trim() || "",
      date: date || Date.now(),
      paymentMethod: paymentMethod || "UPI",
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid expense ID",
      });
    }

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
// Update Expense
const updateExpense = async (req, res) => {
  try {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid expense ID",
  });
}
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

    // Validate amount if provided
    if (amount !== undefined) {
      const numericAmount = Number(amount);

      if (
        isNaN(numericAmount) ||
        numericAmount <= 0
      ) {
        return res.status(400).json({
          message: "Amount must be a positive number",
        });
      }

      expense.amount = numericAmount;
    }

    // Validate category if provided
    if (category !== undefined) {
      if (!category.trim()) {
        return res.status(400).json({
          message: "Category cannot be empty",
        });
      }

      expense.category = category.trim();
    }

    // Update description
    if (description !== undefined) {
      expense.description =
        description.trim();
    }

    // Update date
    if (date !== undefined) {
      expense.date = date;
    }

    // Validate payment method
    if (paymentMethod !== undefined) {
      const allowedPaymentMethods = [
        "UPI",
        "Cash",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Other",
      ];

      if (
        !allowedPaymentMethods.includes(
          paymentMethod
        )
      ) {
        return res.status(400).json({
          message: "Invalid payment method",
        });
      }

      expense.paymentMethod =
        paymentMethod;
    }

    const updatedExpense =
      await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error(
      "Update expense error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while updating expense",
    });
  }
};


// ===============================
// Delete Expense
// ===============================
const deleteExpense = async (req, res) => {
  try {
    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid expense ID",
      });
    }

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