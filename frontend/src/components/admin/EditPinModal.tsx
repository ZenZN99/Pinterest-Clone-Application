import { PinCategorys, type FormPin } from "../../types/pin";

interface EditPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  formPin: FormPin;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onUpdate: () => void;
  loadingPin: boolean;
}

const EditPinModal = ({
  isOpen,
  onClose,
  formPin,
  onChange,
  onUpdate,
  loadingPin,
}: EditPinModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg border border-gray-200 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Pin</h2>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formPin.title}
            onChange={onChange}
            placeholder="Title"
            className="bg-gray-50 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent transition"
          />

          {/* Description */}
          <textarea
            name="content"
            value={formPin.content}
            onChange={onChange}
            placeholder="Description"
            className="bg-gray-50 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent transition"
          />

          {/* Category */}
          <select
            name="category"
            value={formPin.category}
            onChange={onChange}
            className="bg-gray-50 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent transition"
          >
            {Object.values(PinCategorys).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Image */}
          <input
            type="file"
            name="image"
            onChange={onChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E60023]/10 file:text-[#E60023] hover:file:bg-[#E60023]/20"
          />

          {/* Button */}
          <button
            onClick={onUpdate}
            disabled={loadingPin}
            className="bg-[#E60023] p-3 rounded-full text-white font-semibold hover:bg-[#ad081b] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingPin ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Updating...
              </>
            ) : (
              "Update Pin"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPinModal;
