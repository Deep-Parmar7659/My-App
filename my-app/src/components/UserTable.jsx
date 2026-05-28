import useCopyToClipboard from "../hooks/ui/useCopyToClipboard";

export default function UserTable({ users, onEdit, onDelete, loading }) {
  const { copy, isCopied } = useCopyToClipboard();

  if (loading && (!users || users.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
          No Users Found
        </h2>
        <p className="text-gray-500 mt-2">Try adding new users.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <table className="w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-6 py-4 dark:text-white">Name</th>
            <th className="text-left px-6 py-4 dark:text-white">Email</th>
            <th className="text-left px-6 py-4 dark:text-white">Company</th>
            <th className="text-left px-6 py-4 dark:text-white">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              {/* Name — dummyjson uses firstName + lastName, locally added users may use name */}
              <td className="px-6 py-4 dark:text-white font-medium">
                {user.name ?? `${user.name ?? ""} ${user.name ?? ""}`.trim()}
              </td>
              {/* Email */}
              <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                {user.email}
              </td>
              {/* Company — dummyjson uses company.name, locally added users may use company directly */}
              <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                {user.company?.name ?? user.company ?? "—"}
              </td>
              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  {/* Edit */}
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                  {/* Copy */}
                  <button
                    onClick={() => copy(user.email, user.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                  >
                    {isCopied(user.id) ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
