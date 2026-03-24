import type { Dispatch, SetStateAction } from "react";
import { createReply } from "../../apis/reply.api";
import toast from "react-hot-toast";

export const handleCreateReply = async (
  text: string,
  token: string,
  commentId: string,
  setText: Dispatch<SetStateAction<string>>,
  fetchReplies: () => void,
  setLoading: (val: boolean) => void,
) => {
  setLoading(true);

  try {
    if (!text) return;
    const data = await createReply(text, token, commentId);
    if (data.message) {
      return toast.error(data.message);
    }

    setText("");
    fetchReplies();
    toast.success("Reply Created Successfully");
  } catch (error) {
    toast.error("Failed to create reply");
  } finally {
    setLoading(false);
  }
};
