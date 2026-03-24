export const UserRoles = {
  ADMIN: "Admin",
  USER: "User",
} as const;
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser {
  _id?: string;
  fullname: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string | null;
  cover: string | null;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  loadUser: () => void;
  logout: () => void;
}

export type FormUser = {
  _id?: string;
  fullname: string;
  bio: string;
  role: UserRole;
  avatar: string | null;
  cover: string | null;
};
