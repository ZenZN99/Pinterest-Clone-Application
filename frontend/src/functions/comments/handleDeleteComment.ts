import toast from "react-hot-toast";
import { deleteComment } from "../../apis/comment.api";
import { confirmDeleteToast } from "../../services/toast";

export const handleDeleteComment = (
  id: string,
  token: string,
  fetchComments: () => void,
) => {
  confirmDeleteToast(async () => {
    try {
      const data = await deleteComment(token, id);

      if (data?.message) {
        return toast.error(data.message);
      }

      toast.success("Comment Deleted Successfully");

      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  }, "Are you sure you want to delete this comment?");
};
