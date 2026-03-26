import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiCoffee,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiBarChart2,
  FiDatabase,
  FiMessageCircle,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [openMenus, setOpenMenus] = useState({
    content: false,
    analytics: false,
    settings: false,
  });

  const toggleSubMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname === path;

  const menuGroups = [
    {
      title: "MAIN",
      items: [
        { label: "Dashboard", icon: <FiHome />, path: "/admin/dashboard" },
        { label: "Reservations", icon: <FiBookOpen />, path: "/admin/reservations" },
        { label: "Restaurants", icon: <FiCoffee />, path: "/admin/restaurants" },
        { label: "Users", icon: <FiUsers />, path: "/admin/users" },
        { label: "Earnings", icon: <FiDollarSign />, path: "/admin/earnings" },
      ],
    },
    {
      title: "CONTENT",
      collapsible: true,
      key: "content",
      icon: <FiFileText />,
      children: [
        { label: "Pages", path: "/admin/pages" },
        { label: "Blogs", path: "/admin/blogs" },
        { label: "Media Library", path: "/admin/media" },
      ],
    },
    {
      title: "ANALYTICS",
      collapsible: true,
      key: "analytics",
      icon: <FiBarChart2 />,
      children: [
        { label: "User Behavior", path: "/admin/analytics/users" },
        { label: "Traffic", path: "/admin/analytics/traffic" },
        { label: "Sales Reports", path: "/admin/analytics/sales" },
      ],
    },
    {
      title: "SETTINGS",
      collapsible: true,
      key: "settings",
      icon: <FiSettings />,
      children: [
        { label: "General", path: "/admin/settings/general" },
        { label: "Integrations", path: "/admin/settings/integrations" },
        { label: "Permissions", path: "/admin/settings/permissions" },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Tickets", icon: <FiMessageCircle />, path: "/admin/support/tickets" },
        { label: "FAQ", icon: <FiGlobe />, path: "/admin/support/faq" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white/70 backdrop-blur text-[#7B1E1E] p-2 rounded-md"
          >
            <FiHome size={22} />
          </button>
        </div>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white/30 backdrop-blur-md border-r border-white/30 
        transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col justify-between h-full px-4 py-6 overflow-y-auto">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold text-[#7B1E1E] mb-6 px-2 tracking-wide">Rest Panel</h1>

            {/* Navigation */}
            {menuGroups.map((group, i) => (
              <div key={i} className="mb-4">
                {group.title && (
                  <p className="text-xs text-gray-500 mb-1 px-2 uppercase tracking-wider">
                    {group.title}
                  </p>
                )}

                {group.items?.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition
                      ${
                        isActive(item.path)
                          ? "bg-[#7B1E1E] text-white"
                          : "hover:bg-[#7B1E1E]/10 text-gray-700 hover:text-[#7B1E1E]"
                      }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                {group.collapsible && (
                  <div className="px-2">
                    <button
                      onClick={() => toggleSubMenu(group.key)}
                      className="flex justify-between items-center w-full text-sm py-2 text-gray-900 hover:text-[#7B1E1E]"
                    >
                      <span className="flex items-center gap-2">
                        {group.icon}
                        {group.title}
                      </span>
                      {openMenus[group.key] ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {openMenus[group.key] && (
                      <div className="pl-6 mt-1 space-y-1">
                        {group.children.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-2 py-1 rounded-md text-sm 
                              ${
                                isActive(sub.path)
                                  ? "bg-[#7B1E1E] text-white"
                                  : "text-gray-600 hover:bg-[#7B1E1E]/10 hover:text-[#7B1E1E]"
                              }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/logout"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-md transition"
            >
              <FiLogOut className="text-base" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
