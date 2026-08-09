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

  // Delete Expense
  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
      return;
    }

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
      console.error("Delete expense error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    }
  };

  // Get unique categories
  const categories = [
    ...new Set(
      expenses.map(
        (expense) => expense.category
      )
    ),
  ];

  // Filter expenses
  const filteredExpenses = expenses.filter(
    (expense) => {
      const search =
        searchTerm.toLowerCase().trim();

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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 mt-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
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

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Search
          </label>

          <input
            type="text"
            placeholder="Search category or description..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
      </div>

      {/* Empty State */}
      {expenses.length === 0 ? (
        <div className="text-center py-14">

          <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <span className="text-3xl">
              💸
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white">
            No expenses yet
          </h3>

          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            Add your first expense to start
            tracking your spending.
          </p>
        </div>

      ) : filteredExpenses.length === 0 ? (

        /* No Search Results */
        <div className="text-center py-14">

          <div className="w-14 h-14 mx-auto rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <span className="text-2xl">
              🔍
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white">
            No matching expenses
          </h3>

          <p className="text-gray-400 mt-2">
            Try changing your search or category
            filter.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition font-medium"
          >
            Clear Filters
          </button>
        </div>

      ) : (

        /* Expense Table */
        <div className="overflow-x-auto rounded-xl border border-gray-800">

          <table className="w-full min-w-[900px] border-collapse">

            <thead>
              <tr className="bg-gray-800">

                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  Amount
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  Category
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  Description
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  Date
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  Payment
                </th>

                <th className="p-4 text-center text-sm font-semibold text-gray-300">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map(
                (expense) => (
                  <tr
                    key={expense._id}
                    className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                  >

                    {/* Amount */}
                    <td className="p-4 font-semibold text-white">
                      ₹
                      {Number(
                        expense.amount
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    {/* Category */}
                    <td className="p-4">

                      <span className="inline-flex px-3 py-1 rounded-full bg-blue-900/40 text-blue-400 text-sm font-medium">
                        {expense.category}
                      </span>

                    </td>

                    {/* Description */}
                    <td className="p-4 text-gray-300 max-w-xs truncate">
                      {expense.description ||
                        "-"}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-300 whitespace-nowrap">
                      {expense.date
                        ? new Date(
                            expense.date
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    {/* Payment */}
                    <td className="p-4 text-gray-300">
                      {expense.paymentMethod ||
                        "-"}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center whitespace-nowrap">

                      <button
                        onClick={() => {
                          setSelectedExpense(
                            expense
                          );

                          setShowModal(true);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg mr-2 transition font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteExpense(
                            expense._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition font-medium"
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

      {/* Edit Modal */}
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