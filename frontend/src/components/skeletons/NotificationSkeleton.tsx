const NotificationsSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto mt-20 animate-pulse">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>

        <div className="h-10 w-40 bg-gray-300 rounded-full" />
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4">
        {/* Empty state skeleton */}
        <div className="text-center py-20">
          <div className="h-5 w-60 bg-gray-300 rounded mx-auto" />
        </div>

        {/* Skeleton items */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-gray-100 border border-gray-200"
          >
            {/* USER INFO */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <div className="h-4 w-40 bg-gray-300 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="w-8 h-8 rounded-full bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
