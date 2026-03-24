interface UsersTableSkeletonProps {
  count?: number;
}

const UsersTableSkeleton = ({ count = 5 }: UsersTableSkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="shadow p-4 md:p-8 rounded-2xl border border-white/10  animate-pulse md:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Users List</h2>
        <span className="text-sm text-gray-400">Total: {count}</span>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 text-gray-400 text-sm uppercase">
            <tr>
              <th className="py-4">User</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {skeletons.map((_, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-28 bg-gray-300 rounded"></div>
                    <div className="h-3 w-36 bg-gray-300 rounded"></div>
                  </div>
                </td>
                <td>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-20 bg-gray-300 rounded-full"></div>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <div className="h-4 w-10 bg-gray-300 rounded"></div>
                    <div className="h-4 w-10 bg-gray-300 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="flex flex-col gap-4 md:hidden">
        {skeletons.map((_, i) => (
          <div key={i} className="shadow p-4 rounded-xl border border-white/10">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                  <div className="h-3 w-36 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-3">
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTableSkeleton;
