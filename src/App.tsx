import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Analysis from "./pages/Analysis";
import Marketing from "./pages/Marketing";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import { useTheme } from "./context/ThemeContext";
import { AnimatePresence } from "framer-motion";

function AppContent() {
  const location = useLocation();
  const { isDark } = useTheme();

  return (
    <div className={`flex h-screen ${isDark ? "bg-[#141414]" : "bg-gray-100"} text-white`}>
      <Sidebar />
      <div className="flex flex-col flex-1 ml-56 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;