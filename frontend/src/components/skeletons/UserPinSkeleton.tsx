const UserPinSkeleton = () => {
  return (
    <div className="min-h-screen p-6 mt-20 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          {/* Title */}
          <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>

          {/* Upload Button */}
          <div className="h-12 bg-gray-200 rounded-xl"></div>

          {/* File name */}
          <div className="h-3 w-32 bg-gray-200 rounded"></div>

          {/* Form */}
          <div className="space-y-3 bg-gray-200 p-4 rounded-2xl border border-gray-200">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Featured Skeleton */}
          <div className="h-[400px] w-full bg-gray-200 rounded-3xl"></div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden bg-gray-200 h-[250px]"
              >
                {/* Image skeleton */}
                <div className="w-full h-full bg-gray-200"></div>

                {/* Title skeleton */}
                <div className="absolute bottom-0 w-full p-3">
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                </div>

                {/* Actions skeleton */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPinSkeleton;
