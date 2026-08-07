import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import BudgetCard from "../components/BudgetCard";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses
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
    }
  };

  // Load expenses when dashboard opens
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
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    loadExpenses();

    return () => {
      ignore = true;
    };
  }, []);

  // Total Expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  // Transactions
  const transactions = expenses.length;

  // Categories
  const categories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ].length;

  // This Month
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
      (total, expense) => total + Number(expense.amount),
      0
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">
            Dashboard
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Expenses"
              value={`₹${totalExpenses}`}
            />

            <SummaryCard
              title="This Month"
              value={`₹${thisMonth}`}
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

          {/* Monthly Budget */}
          <BudgetCard monthlyExpense={thisMonth} />

          {/* Add Expense */}
          <AddExpenseForm
            fetchExpenses={fetchExpenses}
          />

          {/* Category Chart */}
          <ExpenseChart expenses={expenses} />

          {/* Monthly Chart */}
          <MonthlyExpenseChart
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