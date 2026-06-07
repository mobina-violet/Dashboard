import { TrendingUp, TrendingDown } from "lucide-react";
import { products } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

function ProductTable() {
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
          Top Product Sales
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
      {/*Table */}
      <table className="w-full">
        <thead>
          <tr
            className={`text-xs uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            <th className="text-left pb-3">Product</th>
            <th className="text-right pb-3">Revenue</th>
            <th className="text-right pb-3">Sales</th>
            <th className="text-right pb-3">Growth</th>
            <th className="text-right pb-3">Reviews</th>
            <th className="text-right pb-3">Views</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${isDark ? "divide-white/5" : "divide-gray-100"}`}>
          {products.map((product) => (
            <tr
              key={product.id}
              className={`transition-colors ${
                isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
              }`}>
              <td
                className={`py-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                {product.name}
              </td>
              <td
                className={`py-3 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {product.revenue}
              </td>
              <td
                className={`py-3 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {product.sales}
              </td>
              <td className="py-3 text-right">
                <span
                  className={`flex items-center justify-end gap-1 text-sm font-medium ${
                    product.growth > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                  {product.growth > 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {Math.abs(product.growth)}%
                </span>
              </td>
              <td
                className={`py-3 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {product.reviews}
              </td>
              <td
                className={`py-3 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {product.views}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
