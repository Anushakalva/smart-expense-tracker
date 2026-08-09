import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import CategoryChart from "../components/CategoryChart";
import BudgetCard from "../components/BudgetCard";
import SpendingInsights from "../components/SpendingInsights";
function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] =
  useState(false);
  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial dashboard load
  useEffect(() => {
    let ignore = false;

    const loadExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore) {
          setExpenses(response.data.expenses);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);

        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadExpenses();

    return () => {
      ignore = true;
    };
  }, []);

  // Total Expenses
  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  // Transactions
  const transactions = expenses.length;

  // Categories
  const categories = [
    ...new Set(
      expenses.map((expense) => expense.category)
    ),
  ].length;

  // Current Month
  const now = new Date();

  const thisMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );

  // Loading screen
  if (loading) {
    return (
  <div className="min-h-screen bg-gray-950">

    <Navbar
      onMenuClick={() =>
        setSidebarOpen(true)
      }
    />

    <div className="flex">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="flex-1 p-4 md:p-8 bg-gray-950">
        {/* Your existing dashboard content */}
      </main>

    </div>

  </div>
);
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 bg-gray-950">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
              Dashboard
            </h2>

            <p className="text-gray-400 mt-2">
              Track your spending and manage your
              finances.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Expenses"
              value={`₹${totalExpenses.toLocaleString(
                "en-IN"
              )}`}
            />

            <SummaryCard
              title="This Month"
              value={`₹${thisMonth.toLocaleString(
                "en-IN"
              )}`}
            />

            <SummaryCard
              title="Categories"
              value={categories}
            />

            <SummaryCard
              title="Transactions"
              value={transactions}
            />
          </div>

          {/* Budget */}
          <BudgetCard
            monthlyExpense={thisMonth}
          />

          {/* Add Expense */}
          <AddExpenseForm
            fetchExpenses={fetchExpenses}
          />

          {/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <MonthlyExpenseChart
    expenses={expenses}
  />

  <CategoryChart
    expenses={expenses}
  />
</div>

{/* Spending Insights */}
<SpendingInsights
  expenses={expenses}
/>

{/* Expense List */}
<ExpenseList
  expenses={expenses}
  fetchExpenses={fetchExpenses}
/>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;