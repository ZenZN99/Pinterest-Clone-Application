import { create } from "zustand";
import { Socket } from "socket.io-client";
import { getMyNotifications, getUnreadCount } from "../apis/notification.api";

import type { INotification } from "../types/notification";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket";

interface NotificationStore {
  notifications: INotification[];
  unreadCount: number;
  socket: Socket | null;

  initSocket: (token: string) => void;
  disconnectSocket: () => void;

  fetchNotifications: (token: string) => Promise<void>;
  fetchUnreadCount: (token: string) => Promise<void>;

  addNotification: (notification: INotification) => void;
  markAsReadLocal: (id: string) => void;

  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,

  //  Init Socket
  initSocket: () => {
    const existing = get().socket;

    if (existing?.connected) return;

    const socket = getSocket();

    socket.off("receive-notification");

    socket.on("connect", () => {
      console.log("🟢 Notification socket connected");
    });

    socket.on("receive-notification", (notification: INotification) => {
      console.log("🔥 NEW NOTIFICATION:", notification as any);

      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));

      toast.success(`New notification: ${notification.type}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Notification socket disconnected");
    });

    set({ socket });
  },

  //  Disconnect
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) socket.disconnect();
    set({ socket: null });
  },

  //  Fetch notifications
  fetchNotifications: async (token) => {
    const data = await getMyNotifications(token);

    if (data) {
      set({ notifications: data });
    }
  },

  //  Fetch unread count
  fetchUnreadCount: async (token) => {
    const data = await getUnreadCount(token);

    if (data !== undefined) {
      set({ unreadCount: data });
    }
  },

  //  Add notification (real-time)
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  //  Mark as read locally
  markAsReadLocal: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n,
      ),
      unreadCount: Math.max(state.unreadCount - 1, 0),
    }));
  },

  //  Clear
  clear: () => {
    set({
      notifications: [],
      unreadCount: 0,
      socket: null,
    });
  },
}));
