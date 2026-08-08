import { useState } from "react";

function BudgetCard({ monthlyExpense }) {
  const [budget, setBudget] = useState(() => {
    const savedBudget =
      localStorage.getItem("monthlyBudget");

    return savedBudget
      ? Number(savedBudget)
      : 0;
  });

  const [inputBudget, setInputBudget] =
    useState(() => {
      return (
        localStorage.getItem(
          "monthlyBudget"
        ) || ""
      );
    });

  const handleSaveBudget = (e) => {
    e.preventDefault();

    const newBudget = Number(inputBudget);

    if (!newBudget || newBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    localStorage.setItem(
      "monthlyBudget",
      newBudget
    );

    setBudget(newBudget);

    alert(
      "Monthly budget updated successfully!"
    );
  };

  const remaining =
    budget - monthlyExpense;

  const percentage =
    budget > 0
      ? (monthlyExpense / budget) * 100
      : 0;

  const progress = Math.min(
    percentage,
    100
  );

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-6 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Monthly Budget
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Keep track of your spending limit.
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-blue-900/40 flex items-center justify-center">
          <span className="text-xl">
            💰
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Monthly Budget
          </p>

          <p className="text-xl font-bold text-blue-400 mt-1">
            ₹{budget || 0}
          </p>
        </div>

        <div className="rounded-xl bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Spent
          </p>

          <p className="text-xl font-bold text-red-400 mt-1">
            ₹{monthlyExpense}
          </p>
        </div>

        <div className="rounded-xl bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Remaining
          </p>

          <p
            className={`text-xl font-bold mt-1 ${
              remaining >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ₹{remaining}
          </p>
        </div>
      </div>

      {budget > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">
              Budget Usage
            </span>

            <span className="text-sm font-semibold text-gray-300">
              {percentage.toFixed(1)}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 100
                  ? "bg-red-500"
                  : percentage >= 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {percentage >= 100 && (
            <p className="text-sm text-red-400 font-medium mt-3">
              ⚠️ You have exceeded your
              monthly budget.
            </p>
          )}

          {percentage >= 80 &&
            percentage < 100 && (
              <p className="text-sm text-yellow-400 font-medium mt-3">
                ⚠️ You are approaching your
                monthly budget.
              </p>
            )}
        </div>
      )}

      <form
        onSubmit={handleSaveBudget}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="number"
          min="1"
          placeholder="Enter monthly budget"
          value={inputBudget}
          onChange={(e) =>
            setInputBudget(e.target.value)
          }
          className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}

export default BudgetCard;