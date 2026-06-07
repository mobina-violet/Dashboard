import { useState } from "react";
import { orders, orderStats } from "../data/mockData";
import type { Order } from "../types";
import { Search } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

const statusStyles: Record<Order["status"], string> = {
  Delivered: "bg-green-500/10 text-green-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Processing: "bg-blue-500/10 text-blue-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

function Orders() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "All">(
    "All",
  );

  const filtered = orders.filter((order) => {
    const matchSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        {/*title */}
        <h1
          className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Orders
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {orderStats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 flex flex-col gap-2 transition-colors ${
                isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
              }`}>
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {stat.title}
              </span>
              <p
                className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </p>
              <span
                className={`text-xs font-medium ${stat.change > 0 ? "text-green-400" : "text-red-400"}`}>
                {stat.change > 0 ? "+" : ""}
                {stat.change}% this month
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 w-72 ${
              isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
            }`}>
            <Search size={16} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent text-sm outline-none w-full placeholder:text-gray-400 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            />
          </div>

          {/*filter search */}
          {(
            ["All", "Delivered", "Pending", "Processing", "Cancelled"] as const
          ).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                statusFilter === status
                  ? "bg-orange-500 text-white"
                  : isDark
                    ? "bg-[#1a1a1a] text-gray-400 hover:text-white"
                    : "bg-white text-gray-500 hover:text-gray-900 shadow-sm"
              }`}>
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          className={`rounded-2xl p-5 transition-colors ${
            isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
          }`}>
          <table className="w-full">
            <thead>
              <tr
                className={`text-xs uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                <th className="text-left pb-4">Order ID</th>
                <th className="text-left pb-4">Customer</th>
                <th className="text-left pb-4">Product</th>
                <th className="text-left pb-4">Date</th>
                <th className="text-left pb-4">Amount</th>
                <th className="text-left pb-4">Status</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDark ? "divide-white/5" : "divide-gray-100"}`}>
              {filtered.length > 0 ? (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
                    }`}>
                    <td className="py-3 text-orange-400 text-sm font-medium">
                      {order.id}
                    </td>
                    <td
                      className={`py-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                      {order.customer}
                    </td>
                    <td
                      className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {order.product}
                    </td>
                    <td
                      className={`py-3 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {order.date}
                    </td>
                    <td
                      className={`py-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {order.amount}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className={`py-10 text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Orders;
