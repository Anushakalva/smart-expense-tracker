function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-blue-600 font-medium">
          Dashboard
        </li>

        <li className="cursor-pointer hover:text-blue-600 font-medium">
          Expenses
        </li>

        <li className="cursor-pointer hover:text-blue-600 font-medium">
          Budget
        </li>

        <li className="cursor-pointer hover:text-blue-600 font-medium">
          Settings
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;