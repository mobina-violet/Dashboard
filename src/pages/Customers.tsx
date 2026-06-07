import { useState } from "react";
import { customers } from "../data/mockData";
import { Search } from "lucide-react";
import type { Customer } from "../types";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

const statusStyles: Record<Customer["status"], string> = {
  Active: "bg-green-500/10 text-green-400",
  Inactive: "bg-red-500/10 text-red-400",
};

function Customers() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Customer["status"] | "All">("All");

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Customers</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Customers", value: customers.length, color: isDark ? "text-white" : "text-gray-900" },
            { label: "Active", value: customers.filter(c => c.status === "Active").length, color: "text-green-400" },
            { label: "Inactive", value: customers.filter(c => c.status === "Inactive").length, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-5 flex flex-col gap-2 transition-colors ${
              isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
            }`}>
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</span>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 w-72 ${
            isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
          }`}>
            {/*search */}
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent text-sm outline-none w-full placeholder:text-gray-400 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            />
          </div>

          {(["All", "Active", "Inactive"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                statusFilter === status
                  ? "bg-orange-500 text-white"
                  : isDark
                  ? "bg-[#1a1a1a] text-gray-400 hover:text-white"
                  : "bg-white text-gray-500 hover:text-gray-900 shadow-sm"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className={`rounded-2xl p-5 transition-colors ${
          isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
        }`}>
          <table className="w-full">
            <thead>
              <tr className={`text-xs uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                <th className="text-left pb-4">Customer</th>
                <th className="text-left pb-4">Location</th>
                <th className="text-left pb-4">Phone</th>
                <th className="text-left pb-4">Orders</th>
                <th className="text-left pb-4">Spent</th>
                <th className="text-left pb-4">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-gray-100"}`}>
              {filtered.length > 0 ? (
                filtered.map((customer) => (
                  <tr key={customer.id} className={`transition-colors ${
                    isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
                  }`}>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                          {customer.avatar}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {customer.name}
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{customer.location}</td>
                    <td className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{customer.phone}</td>
                    <td className={`py-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{customer.orders}</td>
                    <td className={`py-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{customer.spent}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={`py-10 text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    No customers found
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

export default Customers;