import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuth, logout } = useContext(AuthContext);

  const navActiveStyle = ({ isActive }) =>
    isActive ? "text-blue-400 font-semibold" : "text-white hover:text-blue-300";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink to="/" className={navActiveStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={navActiveStyle}>
            About
          </NavLink>
          <NavLink to="/contact" className={navActiveStyle}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={navActiveStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/users" className={navActiveStyle}>
            Users
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div>
          {!isAuth ? (
            <NavLink
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
