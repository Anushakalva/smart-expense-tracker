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

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/expenses", expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense Added Successfully!");

      // Reset form
      setExpense({
        amount: "",
        category: "",
        description: "",
        date: "",
        paymentMethod: "UPI",
      });

      // Refresh dashboard data
      if (fetchExpenses) {
        fetchExpenses();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Add New Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
          className="border rounded-lg p-3"
        />

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className="border rounded-lg p-3"
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className="border rounded-lg p-3"
        />

        <select
          name="paymentMethod"
          value={expense.paymentMethod}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>UPI</option>
          <option>Cash</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Net Banking</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpenseForm;