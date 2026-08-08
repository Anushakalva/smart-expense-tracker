import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
  ];

  return (
    <aside className="hidden md:flex w-64 min-h-[calc(100vh-73px)] bg-gray-900 border-r border-gray-800 flex-col justify-between">
      <div className="p-4">
        {/* Menu title */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4">
          Menu
        </p>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-900/40 text-blue-400 border border-blue-900/50"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom information */}
      <div className="mx-4 mb-6 p-4 bg-blue-900/20 border border-blue-900/40 rounded-xl">
        <p className="text-sm font-semibold text-blue-400">
          Smart Spending
        </p>

        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Track your expenses and stay within your
          monthly budget.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;