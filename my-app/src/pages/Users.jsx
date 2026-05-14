import { useState, useMemo, useEffect } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import AddUserModal from "../components/AddUserModal";
import toast from "react-hot-toast";
import UserTable from "../components/UserTable";
import useDebounce from "../hooks/useDebounce";
import usePagination from "../hooks/usePagination";

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

  // Debounced Search
  const debouncedSearch = useDebounce(search, 300);

  // Sorting State
  const [sortOrder, setSortOrder] = useState("asc");

  // Combine API users and locally added users
  const allUsers = useMemo(() => {
    return [...addedUsers, ...users];
  }, [addedUsers, users]);

  // Filter Users
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [allUsers, debouncedSearch]);

  // Sort Users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });
  }, [filteredUsers, sortOrder]);

  // Pagination Hook
  const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } =
    usePagination(sortedUsers, 4);

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

  // Error State
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1
          className="
            text-3xl font-bold
            text-gray-800
            dark:text-white
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
          flex flex-col lg:flex-row
          lg:items-center
          lg:justify-between
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

        {/* Right Controls */}
        <div
          className="
            flex flex-col md:flex-row
            gap-4
            w-full lg:w-auto
          "
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="
              w-full md:w-72
              px-4 py-3
              rounded-xl border
              dark:bg-gray-800
              dark:text-white
            "
          />

          {/* Sorting */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
            }}
            className="
              px-4 py-3
              rounded-xl border
              dark:bg-gray-800
              dark:text-white
            "
          >
            <option value="asc">A → Z</option>

            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {currentData.length === 0 ? (
        <div
          className="
            bg-white dark:bg-gray-800
            p-10 rounded-2xl
            shadow-lg
            text-center
          "
        >
          <h2
            className="
              text-2xl font-bold
              dark:text-white
            "
          >
            🔍 No Users Found
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-300
              mt-2
            "
          >
            Try searching another user name.
          </p>
        </div>
      ) : (
        <UserTable
          users={currentData}
          loading={loading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Pagination */}
      <div
        className="
          flex items-center
          justify-center
          gap-4
          mt-8
        "
      >
        {/* Previous */}
        <button
          onClick={prevPage}
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
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`
                  px-4 py-2 rounded-lg

                    ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                    }
                  `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
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
