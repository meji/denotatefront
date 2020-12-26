import { Category } from "../../categories/domain/category";

export const emptyCategory: Partial<Category> = {
  title: "",
  brief: "",
  description: "",
  img: "",
  featured: false
};
