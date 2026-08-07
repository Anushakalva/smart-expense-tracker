import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = Number(expense.amount);

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;

    return acc;
  }, {});

  // Convert object into chart data
  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // Colors for chart sections
  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#9333ea",
    "#0891b2",
    "#db2777",
    "#4b5563",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Expenses by Category
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No expense data available for the chart.
        </p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => `₹${value}`}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;