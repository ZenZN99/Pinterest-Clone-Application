interface CommentsTableSkeletonProps {
  count?: number;
}

const CommentsTableSkeleton = ({ count = 5 }: CommentsTableSkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="shadow p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 md:ml-64 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10">
            <tr>
              <th className="py-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
              <th>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
              <th className="text-right">
                <div className="h-4 w-20 bg-gray-300 rounded ml-auto"></div>
              </th>
            </tr>
          </thead>

          <tbody>
            {skeletons.map((_, i) => (
              <tr key={i} className="border-b border-white/5">
                {/* User */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />

                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-28 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-300 rounded" />
                    </div>
                  </div>
                </td>

                {/* Comment */}
                <td>
                  <div className="h-4 w-60 bg-gray-300 rounded"></div>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-lg" />
                    <div className="w-8 h-8 bg-gray-300 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Skeleton */}
      <div className="flex flex-col gap-4 md:hidden">
        {skeletons.map((_, i) => (
          <div key={i} className="shadow p-4 rounded-xl border border-white/10">
            {/* User */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />

              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-16 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Comment */}
            <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-lg" />
              <div className="w-8 h-8 bg-gray-300 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsTableSkeleton;
