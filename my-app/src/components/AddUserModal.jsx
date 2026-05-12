import { useState, useEffect } from "react";

import Modal from "./Modal";

const emptyForm = {
  name: "",
  email: "",
  company: "",
};

export default function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
  editingUser,
  onUpdateUser,
}) {
  const [formData, setFormData] = useState(emptyForm);

  // Sync editing user data
  useEffect(() => {
    // Edit Mode
    if (editingUser) {
      queueMicrotask(() => {
        setFormData({
          name: editingUser.name,
          email: editingUser.email,
          company: editingUser.company.name,
        });
      });
    }

    // Add Mode
    else {
      queueMicrotask(() => {
        setFormData(emptyForm);
      });
    }
  }, [editingUser]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update Existing User
    if (editingUser) {
      onUpdateUser({
        ...editingUser,

        name: formData.name,

        email: formData.email,

        company: {
          name: formData.company,
        },
      });
    }

    // Add New User
    else {
      onAddUser({
        id: Date.now(),

        name: formData.name,

        email: formData.email,

        company: {
          name: formData.company,
        },
      });
    }

    // Reset
    setFormData(emptyForm);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Heading */}
      <h2
        className="
          text-2xl font-bold mb-6
          dark:text-white
        "
      >
        {editingUser ? "Edit User" : "Add New User"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className="
            w-full
            px-4 py-3
            rounded-xl border
            dark:bg-gray-800
            dark:text-white
          "
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="
            w-full
            px-4 py-3
            rounded-xl border
            dark:bg-gray-800
            dark:text-white
          "
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Enter company"
          value={formData.company}
          onChange={handleChange}
          required
          className="
            w-full
            px-4 py-3
            rounded-xl border
            dark:bg-gray-800
            dark:text-white
          "
        />

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3 rounded-xl
            transition
          "
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </Modal>
  );
}
