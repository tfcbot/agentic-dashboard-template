export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg">
              <div className="h-4 w-24 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="h-8 w-32 bg-gray-700 rounded animate-pulse" />
            </div>
          ))}

          {/* Content Cards */}
          {[...Array(3)].map((_, i) => (
            <div key={`content-${i}`} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg">
              <div className="h-4 w-48 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 