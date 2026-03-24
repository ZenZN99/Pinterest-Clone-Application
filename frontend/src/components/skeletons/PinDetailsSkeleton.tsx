const PinDetailsSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-10 animate-pulse">
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 border">
        {/* IMAGE */}
        <div className="relative bg-gray-300 h-[300px] md:h-full">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col p-4 h-[70vh]">
          {/* USER */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div>
              <div className="w-24 h-3 bg-gray-300 rounded mb-2" />
              <div className="w-16 h-2 bg-gray-200 rounded" />
            </div>
          </div>

          {/* TITLE */}
          <div className="w-40 h-4 bg-gray-300 rounded mb-3" />

          {/* CONTENT */}
          <div className="space-y-2 mb-4">
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-5/6 h-3 bg-gray-200 rounded" />
          </div>

          {/* COMMENTS */}
          <div className="flex-1 overflow-hidden space-y-3 pr-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg space-y-2">
                {/* COMMENT USER */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  <div className="w-24 h-3 bg-gray-300 rounded" />
                </div>

                {/* TEXT */}
                <div className="w-full h-3 bg-gray-200 rounded" />

                {/* REPLIES */}
                <div className="ml-2 space-y-2">
                  <div className="w-3/4 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="mt-3 flex gap-2">
            <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
            <div className="w-10 h-9 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetailsSkeleton;
