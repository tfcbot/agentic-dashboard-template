interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="bg-gray-800 overflow-hidden shadow-lg rounded-lg border border-gray-700">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-blue-400">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-white">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}; 