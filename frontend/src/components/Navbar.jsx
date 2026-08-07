function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">💰 SmartSpend</h1>

      <div className="font-medium">
        Welcome, {user?.name}
      </div>
    </nav>
  );
}

export default Navbar;