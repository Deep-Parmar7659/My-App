import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function MainLayout() {
  const { isAuth, logout } = useContext(AuthContext);

  const navStyle = ({ isActive }) =>
    isActive ? "text-yellow-300 font-semibold" : "text-white";

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 dark:bg-gray-900
        transition
      "
    >
      {/* Navbar */}
      <nav
        className="
          bg-blue-600 dark:bg-black
          px-8 py-4
          flex items-center justify-between
          shadow-lg
        "
      >
        {/* Left */}
        <div className="flex gap-6">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={navStyle}>
            About
          </NavLink>

          <NavLink to="/contact" className={navStyle}>
            Contact
          </NavLink>

          <NavLink to="/dashboard" className={navStyle}>
            Dashboard
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login Button */}
          {isAuth ? (
            <button
              onClick={logout}
              className="
               bg-red-500
               text-white
                px-4 py-2
                rounded-lg
                font-semibold
              "
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="
               bg-white
               text-blue-600
                px-4 py-2
                rounded-lg
                font-semibold
              "
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Pages */}
      <main
        className="
          p-8
          text-gray-800 dark:text-white
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
