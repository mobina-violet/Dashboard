import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Megaphone,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Orders", icon: ShoppingCart, path: "/orders" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Analysis", icon: BarChart2, path: "/analysis" },
  { label: "Marketing", icon: Megaphone, path: "/marketing" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Help Center", icon: HelpCircle, path: "/help" },
];

function Sidebar() {
  const { isDark } = useTheme();

  return (
    <aside className={`w-56 h-screen flex flex-col justify-between py-6 px-4 fixed left-0 top-0 transition-colors ${
      isDark ? "bg-[#1a1a1a]" : "bg-white border-r border-gray-200"
    }`}>

      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
            Metric Flow
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : isDark
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <nav className="flex flex-col gap-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}

export default Sidebar;