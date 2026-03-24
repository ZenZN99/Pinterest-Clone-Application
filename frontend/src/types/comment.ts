import type { IUser } from "./user";

export interface IComment {
  _id: string;
  text: string;
  userId: string | IUser;
  pinId: string;
}
