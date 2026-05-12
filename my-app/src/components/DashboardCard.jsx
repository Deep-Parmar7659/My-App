export default function DashboardCard({ title, value, color, icon }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800
        p-6 rounded-2xl
        shadow-lg
        hover:scale-105
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      {/* Top Section */}
      <div
        className="
          flex items-center
          justify-between
        "
      >
        {/* Title */}
        <h3
          className="
            text-lg font-medium

            text-gray-600
            dark:text-gray-300
          "
        >
          {title}
        </h3>

        {/* Icon */}
        <div
          className={`
            ${color}

            text-white

            text-2xl

            p-3 rounded-xl
          `}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <p
        className="
          text-4xl font-bold

          mt-6

          text-gray-800
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  );
}
