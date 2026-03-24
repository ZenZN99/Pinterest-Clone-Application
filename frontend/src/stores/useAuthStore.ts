import { create } from "zustand";
import toast from "react-hot-toast";
import { me } from "../apis/user.api";
import type { UserStore } from "../types/user";

export const useAuthStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  loadUser: async () => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("tokenExpire");

    if (!token || !expire || new Date().getTime() > Number(expire)) {
      localStorage.clear();
      set({ user: null, isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      const data = await me(token);
      if (data) set({ user: data });
    } catch (err) {
      localStorage.clear();
      set({ user: null });
      toast.error("Failed to fetch user data");
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, isLoading: false });
  },
}));
