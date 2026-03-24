import type { IUser } from "./user";

export const PinCategorys = {
  ART: "Art",
  TECHNOLOGY: "Technology",
  FASHION: "Fashion",
  FOOD: "Food",
  TRAVEL: "Travel",
  NATURE: "Nature",
  SPORTS: "Sports",
  ANIMALS: "Animals",
  MEMES: "Memes",
  MUSIC: "Music",
} as const;

export type PinCategory = (typeof PinCategorys)[keyof typeof PinCategorys];

export interface IPin {
  _id?: string;
  title: string;
  content: string;
  image: string | null;
  category: PinCategory;
  userId?: string | IUser;
}

export interface FormPin {
  title: string;
  content: string;
  image: File | null;
  category: PinCategory;
}
