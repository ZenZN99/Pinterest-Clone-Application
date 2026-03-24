import toast from "react-hot-toast";
import { PinCategorys, type FormPin, type IPin } from "../../types/pin";
import { updatePin } from "../../apis/pin.api";
import type { Dispatch, SetStateAction } from "react";

export const handleUpdatePin = async (
  editId: string | null,
  form: IPin,
  token: string,
  setForm: Dispatch<SetStateAction<FormPin>>,
  setEditId: (val: null) => void,
  fetchPins: () => void,
  setLoading: (val: boolean) => void,
) => {
  if (!editId) return;

  setLoading(true);

  try {
    const data = await updatePin(
      editId,
      form.title,
      form.content,
      form.category,
      token,
      form.image,
    );

    if (form.title.length > 50) {
      toast.error("Title must be less than 50 characters");
      return;
    }

    if (form.content.length > 150) {
      toast.error("Content must be less than 150 characters");
      return;
    }

    if (data?.message) {
      return toast.error(data.message);
    }

    toast.success("Pin Updated Successfully");

    setForm({
      title: "",
      content: "",
      category: PinCategorys.NATURE,
      image: null,
    });

    setEditId(null);
    fetchPins();
  } catch (error) {
    toast.error("Failed to update pin");
  } finally {
    setLoading(false);
  }
};
