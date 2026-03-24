import { Link } from "react-router-dom";

const VisualSearch = () => {
  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-28 bg-white">
      {/* LEFT - CONTENT */}

      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <img
          src="/visual-search.png"
          alt="visual search"
          className="w-full max-w-md object-cover rounded-2xl shadow-lg"
        />

        <div className="absolute bottom-6 left-6 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
          Try visual search
        </div>
      </div>

      {/* RIGHT - IMAGE */}

      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left mt-10 md:mt-0">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          Search visually with <span className="text-[red]">images</span>
        </h2>

        <p className="text-gray-600 text-lg max-w-lg">
          Search objects within an image to find more styles you’ll love.
        </p>

        <Link
          to="/signup"
          className="inline-block px-6 py-3 rounded-full bg-[red] text-white hover:bg-[#d80000] transition w-fit"
        >
          Join Pinterest
        </Link>
      </div>
    </section>
  );
};

export default VisualSearch;
