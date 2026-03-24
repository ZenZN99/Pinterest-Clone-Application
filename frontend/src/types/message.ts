import type { IUser } from "./user";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content?: string;
  image?: File | null;
  isRead: boolean;
  createdAt: string;
}

export interface ChatStore {

  selectedUser: IUser | null;
  messages: Message[];

  onlineUsers: string[];
  typingUserId: string | null;

  /* -------- Actions -------- */
  selectUser: (user: IUser) => void;

  fetchMessages: (
    receiverId: string,
    token: string
  ) => Promise<void>;

  sendMessage: (
    token: string,
    receiverId: string,
    content: string,
    image: File | null,
  ) => Promise<void>;

  markAsRead: (
    senderId: string,
    token: string
  ) => Promise<void>;



  deleteMessage: (
    messageId: string,
    token: string
  ) => Promise<void>;


  emitTyping: (
    senderId: string,
    receiverId: string,
    isTyping: boolean
  ) => void;

  initSocket: () => void;
}