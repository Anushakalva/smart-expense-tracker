const express = require("express");

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create expense
router.post("/", protect, createExpense);

// Get all expenses
router.get("/", protect, getExpenses);

// Get one expense
router.get("/:id", protect, getExpenseById);

// Update expense
router.put("/:id", protect, updateExpense);

// Delete expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;