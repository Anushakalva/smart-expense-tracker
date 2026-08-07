import { useState } from "react";
import API from "../services/api";
import EditExpenseModal from "./EditExpenseModal";

function ExpenseList({ expenses, fetchExpenses }) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense deleted successfully!");

      // Refresh Dashboard
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    }
  };

  // Get unique categories
  const categories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      expense.category?.toLowerCase().includes(search) ||
      expense.description?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Recent Expenses
      </h2>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Expense Table */}
      {expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses found.
        </p>
      ) : filteredExpenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses match your search or filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">
                  Amount
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Description
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Payment
                </th>

                <th className="p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    ₹{expense.amount}
                  </td>

                  <td className="p-3">
                    {expense.category}
                  </td>

                  <td className="p-3">
                    {expense.description || "-"}
                  </td>

                  <td className="p-3">
                    {expense.date
                      ? new Date(
                          expense.date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    {expense.paymentMethod}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedExpense(expense);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteExpense(expense._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => setShowModal(false)}
          onUpdate={fetchExpenses}
        />
      )}
    </div>
  );
}

export default ExpenseList;