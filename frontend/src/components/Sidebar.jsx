import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 md:top-[73px] left-0 z-50
          w-64 min-h-screen md:min-h-[calc(100vh-73px)]
          bg-gray-950 border-r border-gray-800
          flex flex-col justify-between
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Top Section */}
        <div className="p-4">

          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden px-4 mb-6">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Menu
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition"
              aria-label="Close menu"
            >
              <span className="text-xl">
                ×
              </span>
            </button>

          </div>

          {/* Desktop Menu Title */}
          <div className="hidden md:block px-4 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Menu
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-900/40 text-blue-400 border border-blue-900/50 shadow-sm"
                      : "text-gray-400 hover:bg-gray-800/70 hover:text-white border border-transparent"
                  }`
                }
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>
              </NavLink>
            ))}

          </nav>
        </div>

        {/* Bottom Information */}
        <div className="p-4">

          <div className="p-4 bg-blue-900/20 border border-blue-900/40 rounded-xl">

            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                💡
              </span>

              <p className="text-sm font-semibold text-blue-400">
                Smart Spending
              </p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Track your expenses and stay within
              your monthly budget.
            </p>

          </div>

          <p className="text-center text-xs text-gray-600 mt-4">
            SmartSpend
          </p>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;