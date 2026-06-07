import { countries } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

function CountryCard() {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-4 transition-colors ${
        isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
      }`}>
      {/*title */}
      <div className="flex items-center justify-between">
        <h2
          className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Sales by Country
        </h2>
        <button
          className={`text-sm transition-colors ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-900"
          }`}>
          View All
        </button>
      </div>
      {/*grid */}
      <div className="grid grid-cols-3 gap-3">
        {countries.map((country) => (
          <div
            key={country.name}
            className={`rounded-xl p-3 flex flex-col gap-1 transition-colors ${
              isDark
                ? "bg-[#252525] hover:bg-white/5"
                : "bg-gray-50 hover:bg-gray-100"
            }`}>
            <img
              src={`https://flagcdn.com/w40/${country.code}.png`}
              alt={country.name}
              className="w-8 h-5 rounded-sm object-cover"
            />
            <p
              className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {country.name}
            </p>
            <p className="text-orange-400 text-sm font-bold">
              {country.products}
            </p>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Products
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryCard;
