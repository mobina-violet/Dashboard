import { useState } from "react";
import { campaigns } from "../data/mockData";
import type { Campaign } from "../types";
import { Search, Mail, Share2, MessageSquare, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

const statusStyles: Record<Campaign["status"], string> = {
  Active: "bg-green-500/10 text-green-400",
  Paused: "bg-yellow-500/10 text-yellow-400",
  Ended: "bg-red-500/10 text-red-400",
};

const channelStyles: Record<Campaign["channel"], string> = {
  Email: "bg-blue-500/10 text-blue-400",
  Social: "bg-purple-500/10 text-purple-400",
  SMS: "bg-orange-500/10 text-orange-400",
  Push: "bg-green-500/10 text-green-400",
};

const channelIcons: Record<Campaign["channel"], React.JSX.Element> = {
  Email: <Mail size={14} />,
  Social: <Share2 size={14} />,
  SMS: <MessageSquare size={14} />,
  Push: <Bell size={14} />,
};

function Marketing() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Campaign["status"] | "All">("All");

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalBudget = campaigns.reduce((sum, c) => sum + parseInt(c.budget.replace(/[$,]/g, "")), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Marketing</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Campaigns", value: campaigns.length, color: isDark ? "text-white" : "text-gray-900" },
            { label: "Total Budget", value: `$${totalBudget.toLocaleString()}`, color: "text-orange-400" },
            { label: "Total Clicks", value: totalClicks.toLocaleString(), color: "text-purple-400" },
            { label: "Total Conversions", value: totalConversions.toLocaleString(), color: "text-green-400" },
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
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent text-sm outline-none w-full placeholder:text-gray-400 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            />
          </div>

          {(["All", "Active", "Paused", "Ended"] as const).map((status) => (
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
                <th className="text-left pb-4">Campaign</th>
                <th className="text-left pb-4">Channel</th>
                <th className="text-left pb-4">Status</th>
                <th className="text-left pb-4">Budget</th>
                <th className="text-left pb-4">Spent</th>
                <th className="text-left pb-4">Clicks</th>
                <th className="text-left pb-4">Conversions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-gray-100"}`}>
              {filtered.length > 0 ? (
                filtered.map((campaign) => (
                  <tr key={campaign.id} className={`transition-colors ${
                    isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
                  }`}>
                    <td className={`py-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {campaign.name}
                    </td>
                    <td className="py-3">
                      <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium ${channelStyles[campaign.channel]}`}>
                        {channelIcons[campaign.channel]}
                        {campaign.channel}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[campaign.status]}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{campaign.budget}</td>
                    <td className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{campaign.spent}</td>
                    <td className={`py-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{campaign.clicks.toLocaleString()}</td>
                    <td className={`py-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{campaign.conversions.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={`py-10 text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    No campaigns found
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

export default Marketing;