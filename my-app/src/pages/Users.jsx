import { useState, useMemo, useEffect } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import AddUserModal from "../components/AddUserModal";
import toast from "react-hot-toast";
import UserTable from "../components/UserTable";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import useLocalStorage from "../hooks/useLocalStorage";
import useSearch from "../hooks/useSearch";
import useSort from "../hooks/useSort";
import useModal from "../hooks/useModal";

export default function Users() {
  const { users, loading, error } = useFetchUsers();

  const [addedUsers, setAddedUsers] = useLocalStorage("addedUsers", []);

  // Error Toast
  useEffect(() => {
    if (error) {
      toast.error("❌ Something went wrong");
    }
  }, [error]);

  const { isOpen, openModal, closeModal } = useModal();

  const [editingUser, setEditingUser] = useState(null);

  // Combine API users and locally added users
  const allUsers = useMemo(() => {
    return [...addedUsers, ...users];
  }, [addedUsers, users]);

  const { search, setSearch, filteredData } = useSearch(allUsers, "name");

  const { sortOrder, setSortOrder, sortedData } = useSort(filteredData, "name");

  // Pagination Hook
  const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } =
    usePagination(sortedData, 4);

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

    openModal();
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
          onClick={openModal}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isOpen}
        onClose={() => {
          closeModal();

          setEditingUser(null);
        }}
        onAddUser={handleAddUser}
        editingUser={editingUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
