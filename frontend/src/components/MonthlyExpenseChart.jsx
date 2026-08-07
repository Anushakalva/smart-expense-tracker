import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyExpenseChart({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);

    const month = date.toLocaleString("default", {
      month: "short",
    });

    const year = date.getFullYear();

    const key = `${month} ${year}`;

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = 0;
    }

    monthlyTotals[key] += Number(expense.amount);
  });

  const chartData = Object.entries(monthlyTotals).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Spending
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No expense data available for the chart.
        </p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value) => `₹${value}`}
              />

              <Legend />

              <Bar
                dataKey="amount"
                name="Expenses"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MonthlyExpenseChart;