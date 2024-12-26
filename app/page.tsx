import { DashboardHeader } from './components/DashboardHeader';
import { StatCard } from './components/StatCard';
import { RecentUpdates } from './components/RecentUpdates';
import { ListIcon, AnalyticsIcon } from './components/icons';

export default function HomePage() {
  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Dashboard" />

        {/* Main Content Area */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            title="Total Items"
            value={0}
            icon={<ListIcon />}
          />
          <StatCard
            title="Analytics"
            value="--"
            icon={<AnalyticsIcon />}
          />
        </div>

        <div className="mt-8">
          <RecentUpdates />
        </div>
      </div>
    </div>
  );
}
