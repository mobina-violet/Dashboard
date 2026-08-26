import { useState } from "react";
import { User, Bell, Shield, Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    orders: true,
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [profileMessage, setProfileMessage] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordMessage, setPasswordMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const cardClass = `rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
    isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
  }`;

  const inputClass = `text-sm rounded-xl px-4 py-2.5 outline-none border transition-colors ${
    isDark
      ? "bg-[#252525] text-white border-white/5 focus:border-orange-500"
      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500"
  }`;

  function handleSaveProfile() {
    // TODO: replace with a real API call once the backend is ready
    setProfileMessage("Changes saved!");
    setTimeout(() => setProfileMessage(""), 2500);
  }

  function handleUpdatePassword() {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordMessage({ type: "error", text: "Please fill in all password fields." });
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordMessage({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    // TODO: replace with a real API call once the backend is ready
    setPasswordMessage({ type: "success", text: "Password updated!" });
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setPasswordMessage(null), 2500);
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Settings</h1>

        <div className="grid grid-cols-2 gap-4">

          {/* Profile */}
          <div className={cardClass}>
            <div className={`flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              <User size={18} className="text-orange-400" />
              Profile Settings
            </div>
            <div className="flex flex-col gap-4">
              {[
                { key: "name" as const, label: "Full Name", placeholder: "Mobina Violet" },
                { key: "email" as const, label: "Email", placeholder: "mobina@email.com" },
                { key: "phone" as const, label: "Phone", placeholder: "+1 234 567 890" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5">
                  <label className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={profile[field.key]}
                    onChange={(e) => setProfile((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
              <button
                onClick={handleSaveProfile}
                className="bg-orange-500 text-white text-sm rounded-xl py-2.5 hover:bg-orange-600 transition-colors mt-2"
              >
                Save Changes
              </button>
              {profileMessage && (
                <p className="text-sm text-green-500">{profileMessage}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">

            {/* Notifications */}
            <div className={cardClass}>
              <div className={`flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <Bell size={18} className="text-orange-400" />
                Notifications
              </div>
              {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-sm capitalize ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {key} Notifications
                  </span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      notifications[key] ? "bg-orange-500" : isDark ? "bg-white/10" : "bg-gray-200"
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notifications[key] ? "left-6" : "left-1"
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Appearance */}
            <div className={cardClass}>
              <div className={`flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <Palette size={18} className="text-orange-400" />
                Appearance
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    isDark ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    isDark ? "left-6" : "left-1"
                  }`} />
                </button>
              </div>
            </div>

            {/* Security */}
            <div className={cardClass}>
              <div className={`flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <Shield size={18} className="text-orange-400" />
                Security
              </div>
              <div className="flex flex-col gap-3">
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                  placeholder="Current Password"
                  className={inputClass}
                />
                <input
                  type="password"
                  value={passwords.next}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, next: e.target.value }))}
                  placeholder="New Password"
                  className={inputClass}
                />
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                  placeholder="Confirm Password"
                  className={inputClass}
                />
                <button
                  onClick={handleUpdatePassword}
                  className="bg-orange-500 text-white text-sm rounded-xl py-2.5 hover:bg-orange-600 transition-colors"
                >
                  Update Password
                </button>
                {passwordMessage && (
                  <p className={`text-sm ${passwordMessage.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {passwordMessage.text}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Settings;