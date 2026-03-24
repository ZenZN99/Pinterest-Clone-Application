import toast from "react-hot-toast";
import { PinCategorys, type FormPin, type IPin } from "../../types/pin";
import { createPin } from "../../apis/pin.api";
import type { Dispatch, SetStateAction } from "react";

export const handleCreatePin = async (
  form: IPin,
  token: string,
  setForm: Dispatch<SetStateAction<FormPin>>,
  fetchPins: () => void,
  setLoading: (val: boolean) => void,
) => {
  setLoading(true);

  try {
    if (!form.title || !form.content) {
      return toast.error("Title and content are required");
    }

    if (form.title.length > 50) {
      toast.error("Title must be less than 50 characters");
      return;
    }

    if (form.content.length > 150) {
      toast.error("Content must be less than 150 characters");
      return;
    }

    if (!form.image) {
      return toast.error("Image is required");
    }

    const data = await createPin(
      form.title,
      form.content,
      form.category,
      token,
      form.image,
    );

    if (data?.message) {
      return toast.error(data.message);
    }

    toast.success("Pin Created Successfully");

    setForm({
      title: "",
      content: "",
      category: PinCategorys.NATURE,
      image: null,
    });

    fetchPins();
  } catch (error) {
    toast.error("Failed to create pin");
  } finally {
    setLoading(false);
  }
};
