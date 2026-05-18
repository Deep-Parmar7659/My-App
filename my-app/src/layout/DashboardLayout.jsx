import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import useKeyPress from "../hooks/useKeyPress";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // ESC Key Close Sidebar
  useKeyPress("Escape", () => {
    if (isOpen) {
      closeSidebar();
    }
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen transition">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
