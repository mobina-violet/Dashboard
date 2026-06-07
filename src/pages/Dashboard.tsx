import StatCard from "../components/cards/StatCard";
import { statCards } from "../data/mockData";
import SalesLineChart from "../components/charts/LineChart";
import HeatMap from "../components/charts/HeatMap";
import ProductTable from "../components/tables/ProductTable";
import CountryCard from "../components/cards/CountryCard";
import PageWrapper from "../components/PageWrapper";
function Dashboard() {
  return (
    <PageWrapper >
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} delay={index * 0.1}/>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <HeatMap />
        <SalesLineChart />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ProductTable />
        <CountryCard />
      </div>
    </div>
    </PageWrapper>
  );
}
export default Dashboard;
