import { FaUpload } from "react-icons/fa";
import PinsForm from "./PinsForm";
import type { FormPin } from "../../types/pin";
import type { Dispatch, FormEvent, SetStateAction } from "react";

interface PropPinsSidebar {
  form: FormPin;
  setForm: (Dispatch<SetStateAction<FormPin>>);
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCreate: (e: FormEvent) => void;
  handleUpdate: () => void;
  editPinId: string | null;
}

const PinsSidebar = ({
  form,
  setForm,
  handleChange,
  handleCreate,
  handleUpdate,
  editPinId,
}: PropPinsSidebar) => {
  return (
    <div className="col-span-12 md:col-span-3 space-y-4">
      <h1 className="text-3xl font-bold">My Pins</h1>

      <label className="cursor-pointer flex items-center justify-center gap-3 text-white bg-[red] hover:bg-[#ff1d1d] p-3 rounded-xl text-center font-bold hover:scale-105 transition">
        Upload Image <FaUpload />
        <input type="file" name="image" hidden onChange={handleChange} />
      </label>

      {form.image && (
        <p className="text-xs text-gray-400 truncate">📎 {form.image.name}</p> 
      )}

      <PinsForm
        form={form}
        setForm={setForm}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        editPinId={editPinId}
      />
    </div>
  );
};

export default PinsSidebar;
