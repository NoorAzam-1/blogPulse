import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaStickyNote,
  FaRobot,
  FaTags,
  FaSignOutAlt,
  FaCommentAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
    { to: "/dashboard", icon: <FaUser />, label: "Admin Dashboard" },
    { to: "/dashboard/posts", icon: <FaStickyNote />, label: "Manage Posts" },
    { to: "/dashboard/ai", icon: <FaRobot />, label: "AI Post Generator" },
    { to: "/dashboard/tags", icon: <FaTags />, label: "Manage Tags" },
    { to: "/dashboard/comments", icon: <FaCommentAlt />, label: "Manage Comments" },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-purple-100 overflow-hidden">
      <aside
        className={`relative flex flex-col bg-gray-900 shadow-2xl border-r border-purple-800 
  transition-all duration-500 ease-in-out  ${sidebarCollapsed ? "w-16" : "w-64"}`}>

        <div className="flex items-center justify-between p-4 border-b border-purple-800">
          {!sidebarCollapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}

          <button
            onClick={() =>
              isMobile
                ? setSidebarOpen(false)
                : setSidebarCollapsed((prev) => !prev)
            }
            className="text-purple-300 hover:text-white text-xl"
          >
            {isMobile ? <FaChevronLeft /> : sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow flex flex-col gap-3 mt-4 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center ${sidebarCollapsed ? "justify-center ":""} gap-2 px-3 py-2 rounded-md transition-colors font-medium
                ${location.pathname === item.to
                  ? "bg-purple-500 text-white"
                  : "text-purple-200 hover:bg-purple-600 hover:text-white"
                }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}

              {sidebarCollapsed && (
                <span className="absolute left-16 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 bg-purple-700 text-white text-xs px-2 py-1 rounded-md shadow-md transition-all duration-300 z-50">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className={`flex items-center justify-center gap-3 px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-colors mt-auto mx-4 mb-4 ${sidebarCollapsed ? "justify-center w-12 h-12 mx-auto" : "w-[90%]"}`}>
          <FaSignOutAlt className="text-lg" />
          {!sidebarCollapsed && (<span className="whitespace-nowrap">Logout</span>)}
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
