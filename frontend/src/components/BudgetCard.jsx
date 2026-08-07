import { useEffect, useState } from "react";

function BudgetCard({ monthlyExpense }) {
  const [budget, setBudget] = useState("");
  const [inputBudget, setInputBudget] = useState("");

  // Load saved budget
  useEffect(() => {
    const savedBudget = localStorage.getItem("monthlyBudget");

    if (savedBudget) {
      setBudget(Number(savedBudget));
      setInputBudget(savedBudget);
    }
  }, []);

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

    alert("Monthly budget updated successfully!");
  };

  const remaining = budget - monthlyExpense;

  const percentage =
    budget > 0
      ? (monthlyExpense / budget) * 100
      : 0;

  const progress = Math.min(percentage, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        💰 Monthly Budget
      </h2>

      {/* Budget information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Monthly Budget
          </p>

          <p className="text-2xl font-bold text-blue-600">
            ₹{budget || 0}
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Spent
          </p>

          <p className="text-2xl font-bold text-red-600">
            ₹{monthlyExpense}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Remaining
          </p>

          <p
            className={`text-2xl font-bold ${
              remaining >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{remaining}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {budget > 0 && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Budget Usage
            </span>

            <span className="text-sm font-medium">
              {percentage.toFixed(1)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                percentage >= 100
                  ? "bg-red-500"
                  : percentage >= 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>

          {percentage >= 100 && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              ⚠️ You have exceeded your monthly budget.
            </p>
          )}

          {percentage >= 80 &&
            percentage < 100 && (
              <p className="text-yellow-600 text-sm mt-2 font-medium">
                ⚠️ You are approaching your monthly budget.
              </p>
            )}
        </div>
      )}

      {/* Set Budget */}
      <form
        onSubmit={handleSaveBudget}
        className="flex flex-col md:flex-row gap-3"
      >
        <input
          type="number"
          min="1"
          placeholder="Enter monthly budget"
          value={inputBudget}
          onChange={(e) =>
            setInputBudget(e.target.value)
          }
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}

export default BudgetCard;