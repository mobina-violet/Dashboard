import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { salesData } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

function SalesLineChart() {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-4 h-full transition-colors ${
        isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
      }`}>
      <h2
        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
        Monthly Sales Performance
      </h2>
      {/*Chart */}
      <div className="flex-1" style={{ minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#ffffff10" : "#f0f0f0"}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#252525" : "#ffffff",
                border: isDark ? "none" : "1px solid #e5e7eb",
                borderRadius: "12px",
                color: isDark ? "#fff" : "#111",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: isDark ? "#9ca3af" : "#6b7280",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: "#f97318", r: 4 }}
              activeDot={{ r: 6 }}
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#818cf8"
              strokeWidth={2}
              dot={{ fill: "#818cf8", r: 4 }}
              activeDot={{ r: 6 }}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesLineChart;
