import { useState } from "react";
import API from "../services/api";

function AddExpenseForm({ fetchExpenses }) {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
    paymentMethod: "UPI",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/expenses", expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense added successfully!");

      setExpense({
        amount: "",
        category: "",
        description: "",
        date: "",
        paymentMethod: "UPI",
      });

      if (fetchExpenses) {
        await fetchExpenses();
      }
    } catch (error) {
      console.error(
        "Add expense error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add expense"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 mt-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900/40 flex items-center justify-center">
            <span className="text-xl">➕</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Add New Expense
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Record a new transaction to keep
              your finances organized.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
            disabled={loading}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>

          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
          >
            <option value="">
              Select Category
            </option>

            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>

          <input
            type="text"
            name="description"
            placeholder="e.g. Lunch with friends"
            value={expense.description}
            onChange={handleChange}
            disabled={loading}
            maxLength="100"
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={expense.paymentMethod}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
          >
            <option>UPI</option>
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Net Banking</option>
            <option>Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Adding Expense...
              </>
            ) : (
              <>
                <span>➕</span>
                Add Expense
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddExpenseForm;