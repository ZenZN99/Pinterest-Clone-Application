import toast from "react-hot-toast";
import { updateComment } from "../../apis/comment.api";
import type { Dispatch, SetStateAction } from "react";

export const handleUpdateComment = async (
  text: string,
  token: string,
  pinId: string,
  setText: Dispatch<SetStateAction<string>>,
  setEditId: (val: null) => void,
  fetchComments: () => void,
  setLoading: (val: boolean) => void,
) => {
  if (!pinId) return;

  setLoading(true);

  try {
    const data = await updateComment(text, token, pinId);

    if (data?.message) {
      return toast.error(data.message);
    }

    toast.success("Comment Updated Successfully");

    setText("");
    setEditId(null);
    fetchComments();
  } catch (error) {
    toast.error("Failed to update comment");
  } finally {
    setLoading(false);
  }
};
