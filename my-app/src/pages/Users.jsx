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
import useDebounce from "../hooks/useDebounce";
import useUserMutations from "../hooks/useUserMutations";

export default function Users() {
  const { users, loading, error } = useFetchUsers();
  const { addUserMutation, updateUserMutation, deleteUserMutation } =
    useUserMutations();

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
    const apiUsers = Array.isArray(users) ? users : [];

    const manualUsers = Array.isArray(addedUsers) ? addedUsers : [];

    return [...manualUsers, ...apiUsers];
  }, [users, addedUsers]);

  // Search Hook
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { filteredData } = useSearch(allUsers, "name", debouncedSearch);
  // Previous Search
  const previousSearch = usePrevious(search);
  // Sort Hook (Only API users sorted)
  const { sortOrder, setSortOrder } = useSort([], "name");

  const sortedData = useMemo(() => {
    // Manual users stay on top
    const manualUsers = filteredData.filter((user) => user.id > 1000000000);

    // API users
    const apiUsers = filteredData.filter((user) => user.id <= 1000000000);

    // Sort only API users
    const sortedApiUsers = [...apiUsers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    return [...manualUsers, ...sortedApiUsers];
  }, [filteredData, sortOrder]);

  // Pagination Hook
  const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } =
    usePagination(sortedData, 4);

  // Error Toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Add User
  const handleAddUser = async (newUser) => {
    try {
      await addUserMutation.mutateAsync(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);

    openModal();
  };

  // Update User
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Manual Users
      if (updatedUser.id > 1000000000) {
        const updatedManualUsers = addedUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );
        setAddedUsers(updatedManualUsers);
        toast.success("✏️ User Updated Successfully");
        closeModal();
        return;
      }
      // API Users
      await updateUserMutation.mutateAsync({
        id: updatedUser.id,
        userData: updatedUser,
      });

      toast.success("✏️ User Updated Successfully");
      closeModal();
    } catch (error) {
      console.log(error);
    }
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
