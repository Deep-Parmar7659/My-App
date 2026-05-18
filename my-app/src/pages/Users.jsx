import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

import useFetchUsers from "../hooks/useFetchUsers";
import usePagination from "../hooks/usePagination";
import useLocalStorage from "../hooks/useLocalStorage";
import useSearch from "../hooks/useSearch";
import useSort from "../hooks/useSort";
import useModal from "../hooks/useModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import usePrevious from "../hooks/usePrevious";

import AddUserModal from "../components/AddUserModal";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";

export default function Users() {
  const { users, loading, error } = useFetchUsers();

  // Local Storage Users
  const [addedUsers, setAddedUsers] = useLocalStorage("addedUsers", []);

  // Document Title
  useDocumentTitle("Users");

  // Modal Hook
  const { isOpen, openModal, closeModal } = useModal();

  // Editing User State
  const [editingUser, setEditingUser] = useState(null);

  // Combine All Users
  const allUsers = useMemo(() => {
    return [...addedUsers, ...users];
  }, [addedUsers, users]);

  // Search Hook
  const { search, setSearch, filteredData } = useSearch(allUsers, "name");

  // Previous Search
  const previousSearch = usePrevious(search);

  // Sort Hook
  const { sortOrder, setSortOrder, sortedData } = useSort(filteredData, "name");

  // Pagination Hook
  const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } =
    usePagination(sortedData, 4);

  // Error Toast
  useEffect(() => {
    if (error) {
      toast.error("❌ Something went wrong");
    }
  }, [error]);

  // Add User
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
      {/* Previous Search */}
      {previousSearch && (
        <p className="dark:text-white mb-2">
          Previous Search: {previousSearch}
        </p>
      )}

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Users
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Manage all platform users.
        </p>
      </div>

      {/* Top Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Add User */}
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          + Add User
        </button>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          >
            <option value="asc">A → Z</option>

            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {currentData.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold dark:text-white">
            🔍 No Users Found
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
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

      {/* Modal */}
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
