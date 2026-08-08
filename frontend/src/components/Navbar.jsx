import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">
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

          {/* User section */}
          <div className="flex items-center gap-3">
            {/* User details */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-400">
                {user?.email || ""}
              </p>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-800 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">
                {user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-red-900/40 hover:text-red-400 text-gray-300 border border-gray-700 hover:border-red-800 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;