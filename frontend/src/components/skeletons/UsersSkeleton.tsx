const UsersSkeleton = () => {
  return (
    <div className="p-6 md:p-10 md:ml-64 mt-20">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-10 w-full md:w-72 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border p-5"
          >
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-300"></div>

              {/* Name */}
              <div className="mt-4 h-4 w-32 bg-gray-300 rounded"></div>

              {/* Email */}
              <div className="mt-2 h-3 w-40 bg-gray-300 rounded"></div>

              {/* ID */}
              <div className="mt-2 h-3 w-24 bg-gray-300 rounded"></div>

              {/* Date */}
              <div className="mt-2 h-3 w-28 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSkeleton;
