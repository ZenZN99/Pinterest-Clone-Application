import { FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdminOnly = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="text-[red] text-6xl mb-6">
        <RiAdminFill />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold  mb-3">Admin Only - 403</h1>

      {/* Description */}
      <p className="text-gray-500 max-w-md mb-8">
        You do not have permission to access this page. Only administrators can
        view this content.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-[red] hover:bg-[#ff1919] text-white px-6 py-3 rounded-xl transition shadow-lg"
        >
          <FaHome />
          Back to Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border border-gray-600 text-gray-500 hover:text-white hover:bg-gray-800 px-6 py-3 rounded-xl transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminOnly;