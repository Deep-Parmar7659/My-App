import DashboardCard from "./DashboardCard";

import useDashboardStats from "../hooks/useDashboardStats";

import { FaUsers, FaFileAlt, FaChartLine } from "react-icons/fa";

export default function DashboardCards() {
  const { stats, loading, error } = useDashboardStats();

  // Loading State
  if (loading) {
    return <p className="text-white">Loading stats...</p>;
  }

  // Error State
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Dynamic Cards
  const cards = [
    {
      id: 1,

      title: "Total Users",

      value: stats.users,

      color: "bg-blue-500",

      icon: <FaUsers />,
    },

    {
      id: 2,

      title: "Total Posts",

      value: stats.posts,

      color: "bg-green-500",

      icon: <FaFileAlt />,
    },

    {
      id: 3,

      title: "Analytics",

      value: "89%",

      color: "bg-purple-500",

      icon: <FaChartLine />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3

        gap-6
      "
    >
      {cards.map((card) => (
        <DashboardCard
          key={card.id}
          title={card.title}
          value={card.value}
          color={card.color}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
