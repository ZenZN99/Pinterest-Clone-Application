const ProfileSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 animate-pulse">
      {/* COVER */}
      <div className="relative w-full h-64 bg-gray-200" />

      {/* PROFILE */}
      <div className="max-w-4xl mx-auto px-6">
        {/* AVATAR */}
        <div className="relative -mt-16 w-fit">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg" />
        </div>

        {/* INFO */}
        <div className="mt-4 flex flex-col gap-3">
          {/* NAME */}
          <div className="w-40 h-6 bg-gray-200 rounded" />

          {/* EMAIL */}
          <div className="w-60 h-4 bg-gray-200 rounded" />

          {/* BIO */}
          <div className="w-full h-24 bg-gray-200 rounded-lg" />

          {/* BUTTON */}
          <div className="w-32 h-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
