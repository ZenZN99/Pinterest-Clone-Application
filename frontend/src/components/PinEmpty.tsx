import { FaArrowLeft, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PinEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="text-accent text-6xl text-[red] mb-6">
        <FaImage />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-textPrimary mb-3">
        No Pins Found
      </h1>

      {/* Description */}
      <p className="text-textSecondary max-w-md mb-8">
        There are no pins available at the moment. Try adding new content or
        check back later.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-soft"
      >
        <FaArrowLeft />
        Back to Home
      </button>
    </div>
  );
};

export default PinEmpty;
