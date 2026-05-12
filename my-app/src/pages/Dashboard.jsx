import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };
  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="
            bg-red-500
            text-white
            px-5 py-2 rounded-lg
            hover:bg-red-600
          "
          >
            Logout
          </button>
        </div>
        <p className="text-gray-500 mt-2">Welcome to your admin panel.</p>
      </div>

      {/* Dynamic Cards */}
      <DashboardCards />

      {/* Charts */}
      <DashboardCharts />
    </div>
  );
}
