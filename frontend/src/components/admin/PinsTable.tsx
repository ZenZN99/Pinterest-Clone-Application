import { Link } from "react-router-dom";
import type { IPin } from "../../types/pin";
import { FaImage } from "react-icons/fa";
import PinsTableSkeleton from "../skeletons/PinsTableSkeleton";

interface PinsTableProps {
  pins: IPin[];
  onDelete: (id: string) => void;
  onEdit: (pin: IPin) => void;
  loading: boolean;
}

const PinsTable = ({ pins, onDelete, onEdit, loading }: PinsTableProps) => {
  if (loading) return <PinsTableSkeleton />;

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-200 flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 lg:p-10 overflow-auto">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
        <FaImage className="text-[#E60023]" /> Pins List
      </h2>

      {pins.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No pins found.</p>
      ) : (
        <>
          {/* 💻 Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="py-4">Pins</th>
                  <th>Category</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {pins.map((pin) => (
                  <tr
                    key={pin._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 flex items-center gap-4">
                      <Link to={`/pin/${pin._id}`}>
                        <img
                          src={pin.image as string}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover hover:scale-105 transition duration-200"
                        />
                      </Link>

                      <div>
                        <p className="font-semibold text-sm sm:text-base text-gray-900">
                          {pin.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                          {pin.content.slice(0, 50)}...
                        </p>
                      </div>
                    </td>

                    <td className="text-sm sm:text-base text-gray-800 font-medium">
                      {pin.category}
                    </td>

                    <td className="text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onEdit(pin)}
                          className="px-3 py-1 text-sm rounded-md bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(pin._id as string)}
                          className="px-3 py-1 text-sm rounded-md bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            {pins.map((pin) => (
              <div
                key={pin._id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  <Link to={`/pin/${pin._id}`}>
                    <img
                      src={pin.image as string}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover hover:scale-105 transition"
                    />
                  </Link>

                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">
                      {pin.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                      {pin.content.slice(0, 70)}...
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {pin.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => onEdit(pin)}
                    className="px-3 py-1 text-sm rounded-md bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(pin._id as string)}
                    className="px-3 py-1 text-sm rounded-md bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PinsTable;
