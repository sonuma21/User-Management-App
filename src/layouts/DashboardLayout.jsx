import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  UsersIcon,
  StarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const { theme, setTheme, itemsPerPage, setItemsPerPage, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLink = ({ isActive }) =>
    `btn btn-ghost justify-start gap-2 ${isActive ? "btn-active" : ""}`;

  const SidebarContent = () => (
    <>
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>

      <NavLink to="/users" className={navLink} onClick={() => setSidebarOpen(false)}>
        <UsersIcon className="w-4 h-4" /> Users
      </NavLink>
      <NavLink to="/favorites" className={navLink} onClick={() => setSidebarOpen(false)}>
        <StarIcon className="w-4 h-4" /> Favorites
      </NavLink>

      <div className="mt-auto flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm">Dark</span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </label>

        <select
          className="select select-sm select-bordered"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>

        <button className="btn btn-sm btn-error gap-2" onClick={logout}>
          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-base-200 flex flex-col p-4 gap-2 z-30
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >

        <button
          className="btn btn-ghost btn-sm self-end lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <SidebarContent />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">

        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-base-200 border-b border-base-300">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          <span className="font-bold text-base">Dashboard</span>
        </header>

        <main className="flex-1 overflow-auto bg-base-100">
          <Outlet />
        </main>
      </div>

    </div>
  );
}