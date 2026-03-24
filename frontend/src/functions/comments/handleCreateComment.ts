import toast from "react-hot-toast";
import { createComment } from "../../apis/comment.api";
import type { Dispatch, SetStateAction } from "react";

export const handleCreateComment = async (
  text: string,
  token: string,
  pinId: string,
  setText: (Dispatch<SetStateAction<string>>),
  fetchComments: () => void,
  setLoading: (val: boolean) => void,
) => {
  setLoading(true);

  try {
    if (!text) return;
    const data = await createComment(text, token, pinId);

    if (data?.message) {
      return toast.error(data.message);
    }

    toast.success("Comment Created Successfully");

    setText("");
    fetchComments();
  } catch (error) {
    toast.error("Failed to create comment");
  } finally {
    setLoading(false);
  }
};
