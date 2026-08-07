import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

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

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const transactions = expenses.length;

  const categories = [...new Set(expenses.map((e) => e.category))].length;

  const now = new Date();

  const thisMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, expense) => total + Number(expense.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

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

          <AddExpenseForm fetchExpenses={fetchExpenses} />

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