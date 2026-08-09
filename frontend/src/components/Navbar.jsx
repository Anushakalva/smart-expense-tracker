import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">

      <div className="px-4 md:px-8 py-4">

        <div className="flex items-center justify-between">

          {/* Left Section */}
          <div className="flex items-center">

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden mr-3 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 transition"
              aria-label="Open menu"
            >
              <span className="text-xl">
                ☰
              </span>
            </button>

            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-white text-lg font-bold">
                S
              </span>
            </div>

            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">
                SmartSpend
              </h1>

              <p className="hidden sm:block text-xs text-gray-400">
                Smart Expense Management
              </p>
            </div>

          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">

            {/* User Details */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-400">
                {user?.email || ""}
              </p>
            </div>

            {/* Avatar */}
            <button
              type="button"
              onClick={() =>
                setShowUserMenu(
                  !showUserMenu
                )
              }
              className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-800 flex items-center justify-center hover:bg-blue-900/70 transition"
            >
              <span className="text-blue-400 font-semibold">
                {user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </span>
            </button>

            {/* Desktop Logout */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 bg-gray-900 hover:bg-red-900/30 text-gray-300 hover:text-red-400 border border-gray-800 hover:border-red-800 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <span>↪</span>
              Logout
            </button>

            {/* Mobile User Menu */}
            {showUserMenu && (
              <div className="absolute right-4 top-16 sm:hidden w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-3">

                <div className="px-3 py-2 border-b border-gray-800 mb-2">
                  <p className="text-sm font-semibold text-white">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 break-all">
                    {user?.email || ""}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/30 transition"
                >
                  ↪ Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;