import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";

const faqs = [
  { q: "How do I track my orders?", a: "Go to the Orders page and search by order ID or customer name." },
  { q: "How do I add a new product?", a: "Navigate to the Products page and click the Add Product button." },
  { q: "How do I export reports?", a: "On the Analysis page, click the Export button to download your reports." },
  { q: "How do I manage campaigns?", a: "Go to the Marketing page to view, pause, or create campaigns." },
  { q: "How do I update my profile?", a: "Visit the Settings page and update your information in the Profile section." },
];

function Help() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const cardClass = `rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
    isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
  }`;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Help Center</h1>

        {/* FAQ */}
        <div className={cardClass}>
          <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} className={`border rounded-xl overflow-hidden ${
              isDark ? "border-white/5" : "border-gray-200"
            }`}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
                }`}
              >
                <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {faq.q}
                </span>
                {openIndex === index
                  ? <ChevronUp size={16} className="text-orange-400" />
                  : <ChevronDown size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
                }
              </button>
              {openIndex === index && (
                <div className={`px-4 pb-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className={cardClass}>
          <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Contact Support</h2>
          <textarea
            placeholder="Describe your issue..."
            rows={4}
            className={`text-sm rounded-xl px-4 py-3 outline-none border transition-colors resize-none ${
              isDark
                ? "bg-[#252525] text-white border-white/5 focus:border-orange-500"
                : "bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500"
            }`}
          />
          <button className="bg-orange-500 text-white text-sm rounded-xl py-2.5 hover:bg-orange-600 transition-colors w-fit px-6">
            Send Message
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Help;