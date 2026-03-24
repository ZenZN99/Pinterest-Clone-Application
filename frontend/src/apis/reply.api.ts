import { BACKEND_URL } from "./user.api";

export const createReply = async (
  text: string,
  token: string,
  commentId: string,
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reply/create/${commentId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteReply = async (replyId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reply/delete/${replyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getRepliesByComment = async (commentId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reply/${commentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllReplies = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reply/replies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
