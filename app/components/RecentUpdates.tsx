interface RecentUpdatesProps {
  updates?: string[];
}

export const RecentUpdates = ({ updates = [] }: RecentUpdatesProps) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg border border-gray-700">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-white">Recent Updates</h3>
        <div className="mt-4">
          {updates.length > 0 ? (
            <ul className="space-y-2">
              {updates.map((update, index) => (
                <li key={index} className="text-sm text-gray-400">{update}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No recent updates to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}; 