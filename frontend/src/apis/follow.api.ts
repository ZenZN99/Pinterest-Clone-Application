import { BACKEND_URL } from "./user.api";

export const followUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/follow/${userId}`, {
      method: "POST",
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

export const unfollowUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/follow/${userId}`, {
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

export const isFollowing = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/follow/check/${userId}`, {
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

export const getFollowers = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/follow/followers/${userId}`, {
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

export const getFollowing = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/follow/following/${userId}`, {
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

export const getFollowersCount = async (userId: string, token: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/follow/followers-count/${userId}`,
      {
        method: "GET",
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

export const getFollowingCount = async (userId: string, token: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/follow/following-count/${userId}`,
      {
        method: "GET",
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
