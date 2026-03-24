import { FaEye } from "react-icons/fa";
import type { IPin } from "../../types/pin";

interface PropPinImage {
  pin: IPin | null;
  setShowImageModal: (value: boolean) => void;
}

const PinImage = ({ pin, setShowImageModal }: PropPinImage) => {
  return (
    <div
      className="relative group cursor-zoom-in"
      onClick={() => setShowImageModal(true)}
    >
      {pin?.image && (
        <img
          src={pin.image as any}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      )}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <span className="text-[red] font-semibold flex items-center gap-1">
          <FaEye /> View
        </span>
      </div>
    </div>
  );
};

export default PinImage;
