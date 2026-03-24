import { Link } from "react-router-dom";

const SkinTone = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-gray-900 font-extrabold text-6xl">
          Bring your favorite ideas to life
        </h1>
        <p className="my-2 text-2xl  w-[70%] mx-auto">
          With Pinterest, you can unlock tools that spark your creativity and
          help you find more inspiration.
        </p>
      </div>

      <section className="w-full min-h-screen flex items-center px-6 md:px-16 bg-white">
        {/* LEFT - IMAGE */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/skin-tone.png"
            alt="skin tone"
            className="w-full max-w-lg object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT - CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 mt-10 md:mt-0">
          <h2 className="text-2xl md:text-4xl font-bold">
            Search by <span className="text-[red]">skin tone</span>
          </h2>

          <p className="text-gray-600 text-lg">
            Search with skin tone ranges for beauty ideas that represent you.
          </p>

          <div>
            <Link
              to="/signup"
              className="inline-block px-6 py-3 rounded-full bg-[red] text-white hover:bg-[#d80000] transition"
            >
              Join Pinterest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkinTone;
