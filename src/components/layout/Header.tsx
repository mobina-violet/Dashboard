import { format } from "date-fns";
import { Calendar, Search, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Header() {
  const { isDark } = useTheme();
  const today = new Date();

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
        <button className={`relative p-2 rounded-lg transition-colors ${
          isDark ? "hover:bg-white/5" : "hover:bg-gray-100"
        }`}>
          <Bell size={16} className={isDark ? "text-gray-500" : "text-gray-400"} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full  from-orange-400 to-pink-500 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">M</span>
        </div>

      </div>
    </header>
  );
}

export default Header;