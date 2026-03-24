import { BACKEND_URL } from "./user.api";

export const getMyNotifications = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notification`, {
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

export const getUnreadCount = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notification/unread-count`, {
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

export const markAsRead = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notification/${id}/read`, {
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

export const markAllAsRead = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notification/read-all`, {
      method: "PATCH",
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

export const deleteNotification = async (
  token: string,
  notificationId: string,
) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/notification/${notificationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
