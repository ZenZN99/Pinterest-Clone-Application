import { BACKEND_URL } from "./user.api";

export const createPin = async (
  title: string,
  content: string,
  category: string,
  token: string,
  image: string | null,
) => {
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (content) formData.append("content", content);
  if (category) formData.append("category", category);
  if (image) formData.append("image", image);
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/create`, {
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

export const updatePin = async (
  id: string,
  title: string,
  content: string,
  category: string,
  token: string,
  image: string | null,
) => {
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (content) formData.append("content", content);
  if (category) formData.append("category", category);
  if (image) formData.append("image", image);
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/update/${id}`, {
      method: "PUT",
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

export const deletePin = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/delete/${id}`, {
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

export const getAllPins = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/pins`, {
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

export const getUserPins = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/user`, {
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

export const getPinById = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pin/${id}`, {
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
