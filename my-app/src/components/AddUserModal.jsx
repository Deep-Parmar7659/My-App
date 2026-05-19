import { useEffect } from "react";
import toast from "react-hot-toast";

import useForm from "../hooks/useForm";

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
  // Custom Form Hook
  const { values, handleChange, resetForm, setValues } = useForm(emptyForm);

  // Fill Form When Editing
  useEffect(() => {
    if (editingUser) {
      setValues({
        name: editingUser.name || "",
        email: editingUser.email || "",
        company: editingUser.company?.name || "",
      });
    } else {
      resetForm();
    }
  }, [editingUser, resetForm, setValues]);

  // Close Modal
  if (!isOpen) return null;

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!values.name || !values.email || !values.company) {
      toast.error("⚠️ All fields are required");

      return;
    }

    // Edit User
    if (editingUser) {
      onUpdateUser({
        ...editingUser,

        name: values.name,

        email: values.email,

        company: {
          name: values.company,
        },
      });

      toast.success("✏️ User Updated Successfully");
    }

    // Add User
    else {
      const newUser = {
        id: Date.now(),

        name: values.name,

        email: values.email,

        company: {
          name: values.company,
        },
      };

      onAddUser(newUser);

      toast.success("✅ User Added Successfully");
    }

    // Reset + Close
    resetForm();

    onClose();
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
      "
    >
      {/* Modal */}
      <div
        className="
          bg-white dark:bg-gray-900
          w-full max-w-md
          rounded-2xl
          p-6
          shadow-2xl
        "
      >
        {/* Title */}
        <h2
          className="
            text-2xl font-bold
            mb-6
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
            placeholder="Enter Name"
            value={values.name}
            onChange={handleChange}
            className="
              w-full
              px-4 py-3
              border rounded-xl
              dark:bg-gray-800
              dark:text-white
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            className="
              w-full
              px-4 py-3
              border rounded-xl
              dark:bg-gray-800
              dark:text-white
            "
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Enter Company"
            value={values.company}
            onChange={handleChange}
            className="
              w-full
              px-4 py-3
              border rounded-xl
              dark:bg-gray-800
              dark:text-white
            "
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {/* Cancel */}
            <button
              type="button"
              onClick={() => {
                resetForm();

                onClose();
              }}
              className="
                px-5 py-2
                rounded-xl
                bg-gray-300
                hover:bg-gray-400
              "
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="
                px-5 py-2
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
              "
            >
              {editingUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
