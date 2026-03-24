import { FaArrowLeft } from "react-icons/fa";
import PinCard from "./PinCard";
import type { FormPin, IPin } from "../../types/pin";
import type { Dispatch, SetStateAction } from "react";

interface PropPinsGrid {
  pins: IPin[];
  setForm: Dispatch<SetStateAction<FormPin>>;
  setEditPinId: (id: string | null) => void;

  handleDelete: (id: string) => void;
  navigate: (route: string) => void;
}

const PinsGrid = ({
  pins,
  setForm,
  handleDelete,
  navigate,
  setEditPinId,
}: PropPinsGrid) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pins.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <div className="text-5xl mb-4 opacity-50">📌</div>

          <h2 className="text-xl font-semibold text-gray-700">No Pins Found</h2>

          <p className="text-sm mt-2 max-w-md">
            You haven’t added any pins yet. Start creating and sharing your
            ideas with the world.
          </p>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 mt-5 bg-[red] text-white px-5 py-2 rounded-full hover:bg-[#ff1c1c] transition"
          >
            <FaArrowLeft />
            Back To Home Page
          </button>
        </div>
      ) : (
        pins.slice(1).map((pin: IPin) => (
          <PinCard 
            key={pin._id}
            pin={pin}
            setForm={setForm}
            handleDelete={handleDelete}
            setEditId={setEditPinId}
          />
        ))
      )}
    </div>
  );
};

export default PinsGrid;
