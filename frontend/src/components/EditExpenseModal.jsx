import { useState } from "react";
import API from "../services/api";

function EditExpenseModal({ expense, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    amount: expense?.amount || "",
    category: expense?.category || "",
    description: expense?.description || "",
    date: expense?.date
      ? new Date(expense.date)
          .toISOString()
          .split("T")[0]
      : "",
    paymentMethod:
      expense?.paymentMethod || "UPI",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
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

      await API.put(
        `/expenses/${expense._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Expense updated successfully!");

      if (onUpdate) {
        await onUpdate();
      }

      onClose();
    } catch (error) {
      console.error(
        "Update expense error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update expense"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Edit Expense
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Update your expense details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-50 transition"
            aria-label="Close modal"
          >
            <span className="text-2xl">
              ×
            </span>
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              disabled={loading}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              maxLength="100"
              disabled={loading}
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
              value={formData.date}
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
              value={formData.paymentMethod}
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

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-800">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;