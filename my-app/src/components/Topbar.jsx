import ThemeToggle from "./ThemeToggle";

export default function Topbar({ toggleSidebar }) {
  return (
    <header
      className="
        bg-white dark:bg-gray-900
        shadow
        px-6 py-4
        flex items-center justify-between
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={toggleSidebar}
          className="
            text-2xl
            lg:hidden
            dark:text-white
          "
        >
          ☰
        </button>

        <h1
          className="
            text-2xl font-bold
            text-gray-800 dark:text-white
          "
        >
          Admin Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
