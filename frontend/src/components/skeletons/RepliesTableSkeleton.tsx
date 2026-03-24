const RepliesTableSkeleton = () => {
  return (
    <div className="shadow p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 md:ml-64 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 text-gray-400 text-sm uppercase">
            <tr>
              <th className="py-4">User</th>
              <th>Reply</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-white/5">
                {/* User */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </td>

                {/* Reply */}
                <td>
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Skeleton */}
      <div className="flex flex-col gap-4 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="shadow p-4 rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>

              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>

            <div className="flex justify-end">
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepliesTableSkeleton;
