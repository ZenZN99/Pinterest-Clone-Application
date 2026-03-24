import toast from "react-hot-toast";
import { deleteReply } from "../../apis/reply.api";
import { confirmDeleteToast } from "../../services/toast";

export const handleDeleteReply = (
  id: string,
  token: string,
  fetchReplies: () => void,
) => {
  confirmDeleteToast(async () => {
    try {
      const data = await deleteReply(id, token);

      if (data?.message) {
        return toast.error(data.message);
      }

      toast.success("Reply Deleted Successfully");

      fetchReplies();
    } catch (error) {
      toast.error("Failed to delete reply");
    }
  }, "Are you sure you want to delete this reply?");
};
