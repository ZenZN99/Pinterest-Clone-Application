import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="text-[#6C5CE7] text-6xl mb-6">
        <FaExclamationTriangle />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-3">
        404 - Page Not Found!
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-8">
        Sorry, the page you are trying to access does not exist or may have been
        moved.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-[#0A84FF] hover:bg-[#0066d6] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
      >
        <FaArrowLeft />
        Back to home page
      </button>
    </div>
  );
};

export default NotFound;
