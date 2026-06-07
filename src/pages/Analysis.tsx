import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { barData, categoryData, salesData } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

function Analysis() {
  const { isDark } = useTheme();
  const totalRevenue = barData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = barData.reduce((sum, d) => sum + d.orders, 0);

  const tooltipStyle = {
    backgroundColor: isDark ? "#252525" : "#ffffff",
    border: isDark ? "none" : "1px solid #e5e7eb",
    borderRadius: "12px",
    color: isDark ? "#fff" : "#111",
  };

  const axisStyle = { fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 };
  const gridColor = isDark ? "#ffffff10" : "#f0f0f0";

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Analysis</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Revenue (6 months)", value: `$${totalRevenue.toLocaleString()}`, color: isDark ? "text-white" : "text-gray-900" },
            { label: "Total Orders (6 months)", value: totalOrders.toLocaleString(), color: "text-orange-400" },
            { label: "Avg Order Value", value: `$${(totalRevenue / totalOrders).toFixed(2)}`, color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-5 flex flex-col gap-2 transition-colors ${
              isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
            }`}>
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</span>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Bar Chart */}
          <div className={`rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
            isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
          }`}>
            <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Revenue & Orders by Month
            </h2>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: isDark ? "#9ca3af" : "#6b7280" }} />
                  <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} name="Revenue" />
                  <Bar dataKey="orders" fill="#818cf8" radius={[6, 6, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className={`rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
            isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
          }`}>
            <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Sales by Category
            </h2>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, ""]} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: isDark ? "#9ca3af" : "#6b7280" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bottom Chart */}
        <div className={`rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
          isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
        }`}>
          <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Sales vs Target Trend
          </h2>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px", color: isDark ? "#9ca3af" : "#6b7280" }} />
                <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} name="Sales" />
                <Bar dataKey="target" fill="#34d399" radius={[6, 6, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Analysis;