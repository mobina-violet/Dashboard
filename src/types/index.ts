//شکل داده‌هایی که توی داشبورد نشون می‌دیم رو تعریف می‌کنن

//کارت‌های بالای داشبورد
export interface StatCard {
  title: string;
  value: string;
  change: number;
  period: string;
  delay?: number;
}

//داده‌های Line Chart
export interface SalesData {
  month: string;
  sales: number;
  target: number;
}

//داده‌های Heatmap
export interface HeatmapCell {
  day: string;
  hour: string;
  value: number;
}
// ردیف‌های جدول محصولات
export interface Product {
  id: number;
  name: string;
  revenue: string;
  sales: number;
  growth: number;
  reviews: number;
  views: number;
}
//بخش Sales by Country
export interface Country {
  name: string;
  flag: string;
  code: string;
  products: string;
}
export interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string;
  status: "Delivered" | "Pending" | "Cancelled" | "Processing";
}

export interface OrderStat {
  title: string;
  value: string;
  change: number;
}

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  sold: number;
  rating: number;
  image: string;
}
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: string;
  status: "Active" | "Inactive";
  avatar: string;
}
export interface BarData {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}
export interface Campaign {
  id: number;
  name: string;
  channel: "Email" | "Social" | "SMS" | "Push";
  status: "Active" | "Paused" | "Ended";
  budget: string;
  spent: string;
  clicks: number;
  conversions: number;
}
