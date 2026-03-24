import { create } from "zustand";
import type { ChatStore, Message } from "../types/message";
import {
  deleteMessage,
  getChatMessages,
  markMessageAsRead,
  sendMessage,
} from "../apis/message.api";
import { getSocket } from "../socket/socket";

export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: null,
  messages: [],
  onlineUsers: [],
  typingUserId: null,

  selectUser: (user) => {
    set({
      selectedUser: user,
      messages: [],
      typingUserId: null,
    });
  },

  fetchMessages: async (receiverId: string, token: string) => {
    const data = await getChatMessages(receiverId ,token);

    if (Array.isArray(data)) {
      set({ messages: data });
    } else {
      console.error("API ERROR:", data);
    }
  },

  sendMessage: async (token, receiverId, content, image) => {
    const data = await sendMessage(token, receiverId, content, image);
    if (!data?.error) {
      set((state) => ({
        messages: [...state.messages, data],
      }));

      const socket = getSocket();
      socket.emit("send-message", {
        message: data,
        receiverId,
      });
    }
  },

  markAsRead: async (token, senderId) => {
    const data = await markMessageAsRead(token, senderId);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.map((msg) => {
          return msg.senderId === senderId ? { ...msg, isRead: true } : msg;
        }),
      }));

      getSocket().emit("message-seen", { receiverId: senderId });
    }
  },

  deleteMessage: async (token, messageId) => {
    const data = await deleteMessage(token, messageId);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
    }
  },

  emitTyping: (_senderId, receiverId, isTyping) => {
    getSocket().emit("typing", { receiverId, isTyping });
  },

  initSocket: () => {
    const socket = getSocket();

    socket.on("receive-message", (message) => {
      set((state) => {
        return { messages: [...state.messages, message] };
      });
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      set({ typingUserId: isTyping ? senderId : null });
    });

    socket.on("online-users", (users) => {
      set({ onlineUsers: users });
    });

    socket.on("message-seen", ({ receiverId }) => {
      set((state) => ({
        messages: state.messages.map((msg: Message) => {
          return msg.receiverId === receiverId ? { ...msg, isRead: true } : msg;
        }),
      }));
    });
  },
}));
