export default function UserTable({ users, onEdit, onDelete }) {
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
              {/* Name */}
              <td className="px-6 py-4 dark:text-white">{user.name}</td>
              {/* Email */}
              <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                {user.email}
              </td>
              {/* Company */}
              <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                {user.company.name}
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
                    onClick={() => {
                      onDelete(user.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
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
