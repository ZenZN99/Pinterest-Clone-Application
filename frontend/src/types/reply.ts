import type { IUser } from "./user";

export interface IReply {
  _id: string;
  text: string;
  userId: string | IUser;
  commentId: string;
}
