import { Link } from "react-router-dom";

const Collaborate = () => {
  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-28 bg-white">
      {/* LEFT - IMAGE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left mt-10 md:mt-0">
        <h2 className="text-2xl text-gray-900 md:text-4xl font-bold leading-tight">
          Collaborate with <span className="text-[red]">group boards</span>
        </h2>

        <p className="text-gray-600 text-lg max-w-lg">
          Visualize your ideas with others, using a Pinterest account.
        </p>

        <Link
          to="/signup"
          className="inline-block px-6 py-3 rounded-full bg-[red] text-white hover:bg-[#d80000] transition w-fit"
        >
          Join Pinterest
        </Link>
      </div>

      {/* RIGHT - CONTENT */}

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/collaborate.png"
          alt="collaborate"
          className="w-full max-w-md object-cover rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Collaborate;
