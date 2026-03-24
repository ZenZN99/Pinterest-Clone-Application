import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-16">
      {/* LEFT - IMAGE */}

      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <img src="/logo.webp" alt="" className="h-10 w-[200px] object-cover" />
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover, Save & Share
          <span className="text-[red]"> Ideas</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Explore millions of ideas from creators around the world. Save what
          inspires you and share your creativity with others.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-[red] text-white hover:bg-[#d80000] transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-full border border-[red] text-[red] hover:bg-[red] hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* RIGHT - CONTENT */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <img
          src="/hero.avif"
          alt="hero"
          className="w-full h-[500px] object-cover  max-w-lg rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
