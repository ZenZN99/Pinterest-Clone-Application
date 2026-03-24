import toast from "react-hot-toast";
import { deletePin } from "../../apis/pin.api";
import { confirmDeleteToast } from "../../services/toast";

export const handleDeletePin = (
  id: string,
  token: string,
  fetchPins: () => void,
) => {
  confirmDeleteToast(async () => {
    try {
      const data = await deletePin(id, token);

      if (data?.message) {
        return toast.error(data.message);
      }

      toast.success("Pin Deleted Successfully");

      fetchPins();
    } catch (error) {
      toast.error("Failed to delete pin");
    }
  }, "Are you sure you want to delete this pin?");
};
