import { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import PageWrapper from "../components/PageWrapper";


interface ProductItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const categories = [
  "All",
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];

function Products() {
  const { isDark } = useTheme();
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductItems(data);
        setLoading(false);
      });
  }, []);

  const filtered = productItems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });



  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        {/*title */}
        <h1
          className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Products
        </h1>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/*search */}
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 w-64 ${
                isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
              }`}>
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`bg-transparent text-sm outline-none w-full placeholder:text-gray-400 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              />
            </div>
            {/*category filter */}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors capitalize ${
                  category === cat
                    ? "bg-orange-500 text-white"
                    : isDark
                      ? "bg-[#1a1a1a] text-gray-400 hover:text-white"
                      : "bg-white text-gray-500 hover:text-gray-900 shadow-sm"
                }`}>
                {cat}
              </button>
            ))}
          </div>
          {/*view toggle */}
          <div
            className={`flex items-center gap-2 rounded-xl p-1 ${
              isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
            }`}>
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${
                  view === v
                    ? "bg-orange-500 text-white"
                    : isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div
            className={`text-center py-20 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            No products found
          </div>
         
        ) : view === "grid" ? (
      
          <div className="grid grid-cols-3 gap-4">
             {/*grid view */}
            {filtered.map((product) => (
              <div
                key={product.id}
                className={`rounded-2xl p-5 flex flex-col gap-3 transition-colors ${
                  isDark
                    ? "bg-[#1a1a1a] hover:bg-[#222]"
                    : "bg-white shadow-sm hover:shadow-md"
                }`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-40 object-contain rounded-xl p-3 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full capitalize">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Star size={12} fill="currentColor" />
                    {product.rating.rate}
                  </div>
                </div>
                <p
                  className={`font-medium text-sm line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {product.title}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-orange-400 font-bold">
                    ${product.price}
                  </span>
                  <span
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {product.rating.count} reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`rounded-2xl p-5 transition-colors ${
              isDark ? "bg-[#1a1a1a]" : "bg-white shadow-sm"
            }`}>
            <table className="w-full">
              <thead>
                <tr
                  className={`text-xs uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  <th className="text-left pb-4">Product</th>
                  <th className="text-left pb-4">Category</th>
                  <th className="text-left pb-4">Price</th>
                  <th className="text-left pb-4">Rating</th>
                  <th className="text-left pb-4">Reviews</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? "divide-white/5" : "divide-gray-100"}`}>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-white/3" : "hover:bg-gray-50"
                    }`}>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className={`w-10 h-10 object-contain rounded-lg p-1 ${
                            isDark ? "bg-white/5" : "bg-gray-50"
                          }`}
                        />
                        <span
                          className={`text-sm line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td
                      className={`py-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      ${product.price}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star size={14} fill="currentColor" />
                        {product.rating.rate}
                      </div>
                    </td>
                    <td
                      className={`py-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {product.rating.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Products;
