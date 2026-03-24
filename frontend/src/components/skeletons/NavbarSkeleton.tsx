const NavbarSkeleton = () => {
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 right-0 left-0 z-10 bg-white shadow-md px-6 py-3 flex items-center justify-between animate-pulse">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <div className="md:hidden w-8 h-8 bg-gray-300 rounded" />

          {/* Logo */}
          <div className="h-10 w-40 bg-gray-300 rounded" />
        </div>

        {/* Search */}
        <div className="flex-1 mx-6 hidden md:block">
          <div className="w-full h-10 bg-gray-200 rounded-full" />
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="w-20 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-16 h-4 bg-gray-300 rounded" />
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3 ml-6">
          {/* Avatar */}
          <div className="w-9 h-9 bg-gray-300 rounded-full" />

          {/* Dropdown arrow */}
          <div className="w-4 h-4 bg-gray-300 rounded" />
        </div>
      </nav>

      {/* SIDEBAR MOBILE */}
      <div className="fixed inset-0 bg-black/40 z-40 md:hidden">
        <div className="w-64 h-full bg-white p-5 shadow-xl">
          {/* Logo */}
          <div className="mb-6">
            <div className="h-10 w-10 bg-gray-300 rounded-full" />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <div className="w-24 h-4 bg-gray-300 rounded" />
            <div className="w-28 h-4 bg-gray-300 rounded" />
            <div className="w-20 h-4 bg-gray-300 rounded" />
          </div>

          {/* Auth */}
          <div className="mt-6 border-t pt-4">
            {/* Avatar row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-3 bg-gray-300 rounded" />
                <div className="w-32 h-3 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Logout */}
            <div className="w-full h-8 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarSkeleton;
