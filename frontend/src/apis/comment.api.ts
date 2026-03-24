import { BACKEND_URL } from "./user.api";

export const createComment = async (
  text: string,
  token: string,
  pinId: string,
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/create/${pinId}`, {
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

export const updateComment = async (
  text: string,
  token: string,
  commentId: string,
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/update/${commentId}`, {
      method: "PUT",
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

export const deleteComment = async (token: string, commentId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/delete/${commentId}`, {
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

export const getCommentsByPin = async (token: string, pinId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/pin/${pinId}`, {
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

export const getAllComments = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/comments`, {
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

export const getCommentsByUser = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comment/user`, {
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
