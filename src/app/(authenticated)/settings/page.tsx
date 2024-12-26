import { DashboardHeader } from '@/components/DashboardHeader';

export default function SettingsPage() {
  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Settings" />
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <p className="text-gray-400 mt-2">Configure your application settings here.</p>
        </div>
      </div>
    </div>
  );
} 