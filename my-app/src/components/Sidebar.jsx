import { NavLink } from "react-router-dom";
import { useRef } from "react";

import useOutsideClick from "../hooks/useOutsideClick";

import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaInfoCircle,
  FaEnvelope,
  FaHashtag,
  FaWpforms,
} from "react-icons/fa";

export default function Sidebar({ isOpen, closeSidebar }) {
  const sidebarRef = useRef();

  // Outside Click Close
  useOutsideClick(sidebarRef, () => {
    if (window.innerWidth < 1024 && isOpen) {
      closeSidebar();
    }
  });

  // Sidebar Menu Items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },

    {
      name: "Posts",
      path: "/posts",
      icon: <FaFileAlt />,
    },

    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },

    {
      name: "Contact",
      path: "/contact",
      icon: <FaEnvelope />,
    },

    {
      name: "Counter",
      path: "/counter",
      icon: <FaHashtag />,
    },

    {
      name: "Reducer Form",
      path: "/reducer-form",
      icon: <FaWpforms />,
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 z-50

        w-64 h-screen

        bg-gray-900 dark:bg-black

        p-5

        transform transition-transform duration-300

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}
    >
      {/* Logo */}
      <h1
        className="
          text-3xl font-bold
          text-white
          mb-10
        "
      >
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) {
                closeSidebar();
              }
            }}
            className={({ isActive }) =>
              `
                flex items-center gap-3

                px-4 py-3 rounded-xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `
            }
          >
            {/* Icon */}
            <span className="text-lg">{item.icon}</span>

            {/* Label */}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
