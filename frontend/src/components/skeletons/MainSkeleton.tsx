const MainSkeleton = () => {
  return (
    <div className="p-6 mt-20 animate-pulse">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative break-inside-avoid rounded-2xl overflow-hidden bg-gray-300"
          >
            <div className="w-full h-48 bg-gray-300" />

            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSkeleton;
