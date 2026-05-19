import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import useFetchUsers from "../hooks/useFetchUsers";

export default function Dashboard() {
  const { users } = useFetchUsers();

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <h1
            className="
              text-3xl font-bold

              text-gray-800
              dark:text-white
            "
          >
            Dashboard
          </h1>
        </div>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Welcome to your admin panel.
        </p>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards users={users} />

      {/* Charts */}
      <DashboardCharts />
    </div>
  );
}
