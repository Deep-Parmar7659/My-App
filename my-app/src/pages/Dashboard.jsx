import useDocumentTitle from "../hooks/ui/useDocumentTitle";
import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";

export default function Dashboard() {
  useDocumentTitle("Dashboard");

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Welcome to your admin panel.</p>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

      {/* Charts */}
      <DashboardCharts />
    </div>
  );
}
