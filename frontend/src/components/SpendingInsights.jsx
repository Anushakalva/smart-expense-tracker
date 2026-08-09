import { useMemo } from "react";

function SpendingInsights({ expenses = [] }) {
  const insights = useMemo(() => {
    if (expenses.length === 0) {
      return null;
    }

    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = Number(expense.amount) || 0;

      categoryTotals[category] =
        (categoryTotals[category] || 0) + amount;
    });

    const categories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]);

    const total = categories.reduce(
      (sum, [, amount]) => sum + amount,
      0
    );

    const [topCategory, topAmount] = categories[0];

    const topPercentage =
      total > 0
        ? (topAmount / total) * 100
        : 0;

    return {
      total,
      topCategory,
      topAmount,
      topPercentage,
      categories,
    };
  }, [expenses]);

  if (!insights) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-white">
          Spending Insights
        </h2>

        <p className="text-gray-400 mt-2">
          Add some expenses to see personalized
          spending insights.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6 mt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Spending Insights
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Understand where your money is going.
        </p>
      </div>

      {/* Main Insight */}
      <div className="bg-blue-900/20 border border-blue-900/40 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-900/40 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">
              💡
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Highest Spending Category
            </p>

            <p className="text-lg font-bold text-white mt-1">
              {insights.topCategory}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              ₹
              {insights.topAmount.toLocaleString(
                "en-IN"
              )}{" "}
              ({insights.topPercentage.toFixed(1)}%
              of total spending)
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-4">
          Category Breakdown
        </h3>

        <div className="space-y-4">
          {insights.categories
            .slice(0, 5)
            .map(([category, amount]) => {
              const percentage =
                insights.total > 0
                  ? (amount / insights.total) * 100
                  : 0;

              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      {category}
                    </span>

                    <span className="text-sm font-medium text-white">
                      ₹
                      {amount.toLocaleString(
                        "en-IN"
                      )}
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
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SpendingInsights;