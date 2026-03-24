export const BACKEND_URL = "http://localhost:8000";

export const register = async (
  fullname: string,
  email: string,
  password: string,
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const me = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
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

export const updateProfile = async (
  token: string,
  avatar: File | null,
  cover: File | null,
  bio: string,
) => {
  const formData = new FormData();
  if (avatar) formData.append("avatar", avatar);
  if (cover) formData.append("cover", cover);
  if (bio) formData.append("bio", bio);
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/update/profile`, {
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

export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/users`, {
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

export const getUserById = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/user/${id}`, {
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

export const deleteUserById = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/user/${id}`, {
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
