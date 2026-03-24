import { type FC } from "react";

interface DashboardCardsSkeletonProps {
  count?: number;
}

const DashboardCardsSkeleton: FC<DashboardCardsSkeletonProps> = ({
  count = 4,
}) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:ml-64">
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center gap-4 shadow-sm animate-pulse"
        >
          {/* Icon */}
          <div className="bg-gray-200 w-12 h-12 rounded-full" />

          {/* Text */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCardsSkeleton;