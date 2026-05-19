import useThemeContext from "../hooks/useThemeContext";
import useWindowSize from "../hooks/useWindowSize";
import useOnlineStatus from "../hooks/useOnlineStatus";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar }) {
  const { darkMode, toggleTheme } = useThemeContext();
  const { width } = useWindowSize();
  const isOnline = useOnlineStatus();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={toggleSidebar}
          className="
            text-2xl
            lg:hidden
            dark:text-white
          "
        >
          ☰
        </button>

        <h1
          className="
            text-2xl font-bold
            text-gray-800 dark:text-white
          "
        >
          Admin Dashboard
        </h1>
      </div>
      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="
          bg-gray-200
          dark:bg-gray-700
          px-4 py-2
          rounded-lg
          dark:text-white
          "
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Screen Width: {width}
        </p>
        <p className="dark:text-white">
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
