import { useState, useEffect } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import useKeyPress from "../hooks/useKeyPress";

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

  const [errors, setErrors] = useState({});

  useKeyPress("Escape", () => {
    if (isOpen) {
      onClose();
    }
  });

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

        setErrors({});
      });
    }

    // Add Mode
    else {
      queueMicrotask(() => {
        setFormData(emptyForm);

        setErrors({});
      });
    }
  }, [editingUser]);

  // Validate Single Field
  const validateField = (name, value) => {
    let error = "";

    // Name Validation
    if (name === "name") {
      if (!value.trim()) {
        error = "❌ Name is required";
      }
    }

    // Email Validation
    if (name === "email") {
      if (!value.trim()) {
        error = "❌ Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "❌ Invalid email format";
      }
    }

    // Company Validation
    if (name === "company") {
      if (!value.trim()) {
        error = "❌ Company is required";
      } else if (value.length < 3) {
        error = "❌ Company name too short";
      }
    }

    return error;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update Form Data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Live Validation
    const errorMessage = validateField(name, value);

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  // Validate Full Form
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "❌ Name is required";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "❌ Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "❌ Invalid email format";
    }

    // Company Validation
    if (!formData.company.trim()) {
      newErrors.company = "❌ Company is required";
    } else if (formData.company.length < 3) {
      newErrors.company = "❌ Company name must be at least 3 characters";
    }

    setErrors(newErrors);

    // Show First Error Toast
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];

      toast.error(firstError);

      return false;
    }

    return true;
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Stop if validation fails
    if (!validateForm()) return;

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

    // Reset Form
    setFormData(emptyForm);

    setErrors({});

    // Close Modal
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
          className={`
            w-full
            px-4 py-3
            rounded-xl border

            transition-all duration-300

            dark:bg-gray-800
            dark:text-white

            ${errors.name ? "border-red-500" : "border-gray-300"}
          `}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full
            px-4 py-3
            rounded-xl border

            transition-all duration-300

            dark:bg-gray-800
            dark:text-white

            ${errors.email ? "border-red-500" : "border-gray-300"}
          `}
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Enter company"
          value={formData.company}
          onChange={handleChange}
          className={`
            w-full
            px-4 py-3
            rounded-xl border

            transition-all duration-300

            dark:bg-gray-800
            dark:text-white

            ${errors.company ? "border-red-500" : "border-gray-300"}
          `}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full

            bg-blue-600
            hover:bg-blue-700

            text-white

            py-3 rounded-xl

            transition-all duration-300
          "
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </Modal>
  );
}
