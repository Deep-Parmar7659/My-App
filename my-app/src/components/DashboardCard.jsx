export default function DashboardCard({ title, value, color }) {
  return (
    <div
      className={`
                ${color}
                p-6 rounded-2xl shadow-lg
                hover:scale-105
                transition duration-300
                text-white
                `}
    >
      {/* Title */}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {/* Value */}
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
