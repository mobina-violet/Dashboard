import { heatmapData } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm"];

function getColor(value: number, isDark: boolean) {
  if (value >= 2000) return isDark ? "bg-orange-500" : "bg-orange-500";
  if (value >= 1000) return isDark ? "bg-orange-400/70" : "bg-orange-300";
  if (value >= 500) return isDark ? "bg-orange-300/40" : "bg-orange-200";
  return isDark ? "bg-white/5" : "bg-gray-100";
}

function HeatMap() {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
      isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
    }`}>
      
      <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
        Orders by Time
      </h2>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 pt-6">
          {hours.map((hour) => (
            <div key={hour} className="h-8 flex items-center justify-end pr-2">
              <span className={`text-xs whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {hour}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {day}
              </div>
            ))}
          </div>

          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const cell = heatmapData.find(
                  (d) => d.day === day && d.hour === hour
                );
                return (
                  <div
                    key={day}
                    className={`h-8 rounded-md ${getColor(cell?.value ?? 0, isDark)}`}
                    title={`${day} ${hour}: ${cell?.value ?? 0}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={`flex items-center gap-3 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full inline-block ${isDark ? "bg-white/10" : "bg-gray-200"}`}></span>200+
        </span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full inline-block ${isDark ? "bg-orange-300/40" : "bg-orange-200"}`}></span>500+
        </span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full inline-block ${isDark ? "bg-orange-400/70" : "bg-orange-300"}`}></span>1000+
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block bg-orange-500"></span>2000+
        </span>
      </div>
    </div>
  );
}

export default HeatMap;