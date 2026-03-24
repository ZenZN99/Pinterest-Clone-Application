import { BACKEND_URL } from "./user.api";

export const sendMessage = async (
  token: string,
  receiverId: string,
  content: string,
  image: File | null,
) => {
  const formData = new FormData();
  if (receiverId) formData.append("receiverId", receiverId);
  if (content) formData.append("content", content);
  if (image) formData.append("image", image);
  try {
    const res = await fetch(`${BACKEND_URL}/api/message/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getChatMessages = async (receiverId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/message/${receiverId}`, {
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

export const deleteMessage = async (token: string, messageId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/message/${messageId}`, {
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

export const markMessageAsRead = async (token: string, senderId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/message/${senderId}`, {
      method: "PUT",
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
