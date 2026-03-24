import { FaLock, FaHome, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="text-[red text-6xl mb-6">
        <FaLock />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-white mb-3">
        Unauthorized - 401
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-8">
        You must be logged in to access this page. Please sign in first.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-[red] hover:bg-[#ff0a0a] text-white px-6 py-3 rounded-xl transition shadow-lg"
        >
          <FaSignInAlt />
          Sign In
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-xl transition"
        >
          <FaHome />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;