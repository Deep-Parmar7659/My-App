import { useState, useMemo, useEffect } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import AddUserModal from "../components/AddUserModal";
import toast from "react-hot-toast";
export default function Users() {
  const { users, loading, error } = useFetchUsers();

  // Local Added Users State with localStorage
  const [addedUsers, setAddedUsers] = useState(() => {
    const savedUsers = localStorage.getItem("addedUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save users to localStorage whenever addedUsers changes
  useEffect(() => {
    localStorage.setItem("addedUsers", JSON.stringify(addedUsers));
  }, [addedUsers]);

  // Error Toast
  useEffect(() => {
    if (error) {
      toast.error("❌ Something went wrong");
    }
  }, [error]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Search State
  const [search, setSearch] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 4;

  // Combine API users and locally added users
  const allUsers = useMemo(
    () => [...addedUsers, ...users],
    [addedUsers, users],
  );

  // Filter Users
  const filteredUsers = useMemo(
    () =>
      allUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [allUsers, search],
  );

  // Pagination Logic
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  // Add New User
  const handleAddUser = (newUser) => {
    setAddedUsers((prevUsers) => [newUser, ...prevUsers]);
    toast.success("✅ User Added Successfully");
  };

  // Delete User
  const handleDeleteUser = (id) => {
    const updatedUsers = addedUsers.filter((user) => user.id !== id);
    setAddedUsers(updatedUsers);
    toast.success("🗑️ User Deleted Successfully");
  };

  // Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);

    setIsModalOpen(true);
  };

  // Update User
  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = addedUsers.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    );
    setAddedUsers(updatedUsers);
    setEditingUser(null);
    toast.success("✏️ User Updated Successfully");
  };

  // Loading
  if (loading) {
    return <p className="text-white">Loading users...</p>;
  }

  // Error
  if (error) {
    toast.error("❌ Something went wrong");
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1
          className="
            text-3xl font-bold
            text-gray-800 dark:text-white
          "
        >
          Users
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-300
            mt-2
          "
        >
          Manage all platform users.
        </p>
      </div>

      {/* Top Actions */}
      <div
        className="
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6
        "
      >
        {/* Add User Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            bg-blue-600
            hover:bg-blue-700

            text-white

            px-5 py-3
            rounded-xl

            transition
          "
        >
          + Add User
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Users Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="
              bg-white dark:bg-gray-800

              p-6 rounded-2xl

              shadow-lg
            "
          >
            {/* User Name */}
            <h2
              className="
                text-xl font-bold

                text-gray-800
                dark:text-white
              "
            >
              {user.name}
            </h2>

            {/* User Email */}
            <p
              className="
                text-gray-500
                dark:text-gray-300
                mt-2
              "
            >
              {user.email}
            </p>

            {/* Company */}
            <p
              className="
                text-gray-400
                mt-1
              "
            >
              {user.company.name}
            </p>

            {/* Action Buttons */}
            <div
              className="
                flex gap-3
                mt-5
              "
            >
              {/* Edit */}
              <button
                onClick={() => handleEditUser(user)}
                className="
                  bg-yellow-500
                  hover:bg-yellow-600

                  text-white

                  px-4 py-2
                  rounded-lg
                "
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="
                  bg-red-500
                  hover:bg-red-600

                  text-white

                  px-4 py-2
                  rounded-lg
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        className="
          flex items-center gap-4
          mt-8
        "
      >
        {/* Previous */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            bg-blue-600
            text-white

            px-5 py-2
            rounded-lg

            disabled:opacity-50
          "
        >
          Previous
        </button>

        {/* Page Info */}
        <span
          className="
            dark:text-white
          "
        >
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            bg-blue-600
            text-white

            px-5 py-2
            rounded-lg

            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onAddUser={handleAddUser}
        editingUser={editingUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
