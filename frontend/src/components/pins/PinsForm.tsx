import type { Dispatch, FormEvent, SetStateAction } from "react";
import { PinCategorys, type FormPin, type PinCategory } from "../../types/pin";

interface PropPinsForm {
  form: FormPin;
  setForm: Dispatch<SetStateAction<FormPin>>;
  handleCreate: (e: FormEvent) => void;
  handleUpdate: () => void;
  editPinId: string | null;
}

const PinsForm = ({
  form,
  setForm,
  handleCreate,
  handleUpdate,
  editPinId,
}: PropPinsForm) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editPinId) {
      handleUpdate();
    } else {
      handleCreate(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10"
    >
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm((prev: FormPin) => ({ ...prev, title: e.target.value }))
        }
        className="w-full bg-white/10 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[red]"
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) =>
          setForm((prev: FormPin) => ({ ...prev, content: e.target.value }))
        }
        className="w-full bg-white/10 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[red]"
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm(
            (prev: FormPin): FormPin => ({
              ...prev,
              category: e.target.value as PinCategory,
            }),
          )
        }
        className="w-full bg-white/10 p-2 rounded-lg"
      >
        {Object.values(PinCategorys).map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-[red] text-white p-2 rounded-lg font-bold hover:scale-105 transition"
      >
        {editPinId ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default PinsForm;
