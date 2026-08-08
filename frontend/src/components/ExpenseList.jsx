import { useState } from "react";
import API from "../services/api";
import EditExpenseModal from "./EditExpenseModal";

function ExpenseList({ expenses, fetchExpenses }) {
  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense deleted successfully!");

      fetchExpenses();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    }
  };

  const categories = [
    ...new Set(
      expenses.map(
        (expense) => expense.category
      )
    ),
  ];

  const filteredExpenses = expenses.filter(
    (expense) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        expense.category
          ?.toLowerCase()
          .includes(search) ||
        expense.description
          ?.toLowerCase()
          .includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-6 mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Expenses
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            View and manage your transactions.
          </p>
        </div>

        <div className="text-sm text-gray-400">
          {filteredExpenses.length} transaction
          {filteredExpenses.length !== 1
            ? "s"
            : ""}
        </div>
      </div>

      {/* Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">
            💸
          </div>

          <h3 className="text-lg font-semibold text-white">
            No expenses yet
          </h3>

          <p className="text-gray-400 mt-1">
            Add your first expense to start
            tracking your spending.
          </p>
        </div>
      ) : filteredExpenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">
            🔍
          </div>

          <h3 className="text-lg font-semibold text-white">
            No matching expenses
          </h3>

          <p className="text-gray-400 mt-1">
            Try changing your search or category
            filter.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 text-left text-sm font-semibold text-gray-300">
                  Amount
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-300">
                  Category
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-300">
                  Description
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-300">
                  Date
                </th>

                <th className="p-3 text-left text-sm font-semibold text-gray-300">
                  Payment
                </th>

                <th className="p-3 text-center text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map(
                (expense) => (
                  <tr
                    key={expense._id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="p-3 font-semibold text-white">
                      ₹{expense.amount}
                    </td>

                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full bg-blue-900/40 text-blue-400 text-sm">
                        {expense.category}
                      </span>
                    </td>

                    <td className="p-3 text-gray-300">
                      {expense.description ||
                        "-"}
                    </td>

                    <td className="p-3 text-gray-300">
                      {expense.date
                        ? new Date(
                            expense.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-3 text-gray-300">
                      {expense.paymentMethod}
                    </td>

                    <td className="p-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedExpense(
                            expense
                          );
                          setShowModal(true);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg mr-2 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteExpense(
                            expense._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() =>
            setShowModal(false)
          }
          onUpdate={fetchExpenses}
        />
      )}
    </div>
  );
}

export default ExpenseList;