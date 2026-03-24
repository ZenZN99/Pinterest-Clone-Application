import type { IUser } from "../types/user";

export const isUserObject = (user: any): user is IUser => {
  return user && typeof user === "object" && "_id" in user;
};

export const getUserName = (user: any) => {
  if (isUserObject(user)) return user.fullname;
  return "User";
};

export const getUserAvatar = (user: any) => {
  if (isUserObject(user) && user.avatar) return user.avatar;
  return "/default-avatar.png";
};
