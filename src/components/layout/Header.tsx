import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Search, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const mockNotifications = [
  { id: 1, text: "New order #4521 received", time: "5m ago" },
  { id: 2, text: "Product 'Wireless Mouse' is low on stock", time: "1h ago" },
  { id: 3, text: "Monthly report is ready to view", time: "3h ago" },
];

function Header() {
  const { isDark } = useTheme();
  const today = new Date();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close the notifications dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
      isDark
        ? "bg-[#1a1a1a] border-white/5"
        : "bg-white border-gray-200"
    }`}>

      {/* Search */}
      <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 w-80 ${
        isDark ? "bg-[#252525]" : "bg-gray-100"
      }`}>
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search.."
          className={`bg-transparent text-sm outline-none w-full placeholder:text-gray-400 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Date */}
        <div className={`flex items-center gap-2 text-sm ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
          <Calendar size={16} />
          <span>{format(today, "EEE dd MMM yyyy")}</span>
        </div>

        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className={`relative p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
          >
            <Bell size={16} className={isDark ? "text-gray-500" : "text-gray-400"} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg border overflow-hidden z-50 ${
              isDark ? "bg-[#1f1f1f] border-white/10" : "bg-white border-gray-200"
            }`}>
              <div className={`px-4 py-3 text-sm font-semibold border-b ${
                isDark ? "text-white border-white/5" : "text-gray-800 border-gray-100"
              }`}>
                Notifications
              </div>
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 text-sm border-b last:border-b-0 ${
                    isDark
                      ? "text-gray-300 border-white/5 hover:bg-white/5"
                      : "text-gray-600 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <p>{n.text}</p>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">M</span>
        </div>

      </div>
    </header>
  );
}

export default Header;