import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useDashboardStats from "../hooks/useDashboardStats";

export default function AnalyticsChart() {
  const { stats, loading, error } = useDashboardStats();

  // Loading
  if (loading) {
    return <p className="text-white">Loading chart...</p>;
  }

  // Error
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Dynamic Chart Data
  const data = [
    {
      name: "Users",
      total: stats.users,
    },

    {
      name: "Posts",
      total: stats.posts,
    },

    {
      name: "Analytics",
      total: 89,
    },
  ];

  return (
    <div
      className="
        bg-white dark:bg-gray-800
        p-6 rounded-2xl shadow-lg
      "
    >
      {/* Heading */}
      <h2
        className="
          text-2xl font-bold mb-6
          text-gray-800 dark:text-white
        "
      >
        Dashboard Analytics
      </h2>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
