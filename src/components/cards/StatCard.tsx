import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import type { StatCard as StatCardType } from "../../types";

function StatCard({ title, value, change, period, delay = 0 }: StatCardType) {
  const { isDark } = useTheme();
  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-5 flex flex-col gap-3 transition-colors ${
        isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
      }`}
    >
      {/* Title & Change */}
      <div className="flex items-center justify-between">
        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </span>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isPositive
            ? "text-green-400 bg-green-400/10"
            : "text-red-400 bg-red-400/10"
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? "+" : ""}{change}%
        </span>
      </div>

      {/* Value */}
      <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
        {value}
      </p>

      {/* Period */}
      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        {period}
      </p>
    </motion.div>
  );
}

export default StatCard;