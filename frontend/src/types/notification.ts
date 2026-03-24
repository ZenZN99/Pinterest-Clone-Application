import type { IUser } from "./user";

export const NotificationTypes = {
  COMMENT: "Comment",
  REPLY: "Reply",
  FOLLOW: "Follow",
  PIN: "Pin",
} as const;

export type NotificationType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface INotification {
  _id: string;
  senderId: IUser;
  receiverId: string;
  type: NotificationType;
  target: string;
  isRead: boolean;
}
