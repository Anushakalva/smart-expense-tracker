function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>SmartSpend Dashboard</h1>

      <hr />

      <h3>Welcome, {user?.name} 👋</h3>

      <p>Email: {user?.email}</p>

      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Dashboard;