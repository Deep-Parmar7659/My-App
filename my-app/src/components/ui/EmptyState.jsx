export default function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display right now.",
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">{description}</p>
    </div>
  );
}
