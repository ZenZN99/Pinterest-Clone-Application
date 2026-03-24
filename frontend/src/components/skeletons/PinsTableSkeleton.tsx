const PinsTableSkeleton = () => {
  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-200 flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 lg:p-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-32 h-6 bg-gray-200 rounded"></div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </th>
              <th>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </th>
              <th className="text-right">
                <div className="w-20 h-4 bg-gray-200 rounded ml-auto"></div>
              </th>
            </tr>
          </thead>

          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                {/* Pin */}
                <td className="py-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-40 h-3 bg-gray-200 rounded"></div>
                  </div>
                </td>

                {/* Category */}
                <td>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards Skeleton */}
      <div className="flex flex-col gap-4 lg:hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-xl"></div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="w-40 h-3 bg-gray-200 rounded"></div>
                <div className="w-24 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinsTableSkeleton;
