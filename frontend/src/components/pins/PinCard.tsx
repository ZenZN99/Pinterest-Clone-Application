import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import type { FormPin, IPin } from "../../types/pin";
import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface PropPinCard {
  pin: IPin;
  setForm: Dispatch<SetStateAction<FormPin>>;
  setEditId: (pinId: string) => void;
  handleDelete: (id: string) => void;
}

const PinCard = ({ pin, setForm, handleDelete, setEditId }: PropPinCard) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
      <Link to={`/pin/${pin._id}`}>
        <img
          src={pin.image as string}
          className="w-full h-[250px] object-cover group-hover:scale-110 transition duration-500"
        />
      </Link>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 text-white group-hover:opacity-100 transition flex items-center justify-center">
        <FaEye />
      </div>

      {/* Title */}
      <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-sm font-semibold hover:text-white">{pin.title}</p>
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition flex gap-2">
        <button
          onClick={() => {
            setForm({
              title: pin.title,
              content: pin.content,
              image: null,
              category: pin.category,
            });
            setEditId(pin._id as string);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-[#0080ff] text-white px-2 py-1 rounded text-xs"
        >
          <FaPen />
        </button>

        <button
          onClick={() => handleDelete(pin._id!)}
          className="bg-[red] px-2 text-white py-1 rounded text-xs"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default PinCard;
