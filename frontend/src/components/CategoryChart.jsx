import { useMemo } from "react";

function CategoryChart({ expenses = [] }) {
  const categoryData = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = Number(expense.amount) || 0;

      totals[category] = (totals[category] || 0) + amount;
    });

    return Object.entries(totals).sort(
      (a, b) => b[1] - a[1]
    );
  }, [expenses]);

  const total = categoryData.reduce(
    (sum, [, amount]) => sum + amount,
    0
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Expenses by Category
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          See where your money is going
        </p>
      </div>

      {categoryData.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">
            📊
          </div>

          <p className="text-gray-400">
            No category data available.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {categoryData.map(([category, amount]) => {
            const percentage =
              total > 0
                ? (amount / total) * 100
                : 0;

            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    {category}
                  </span>

                  <span className="text-sm font-semibold text-white">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {percentage.toFixed(1)}% of total expenses
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryChart;