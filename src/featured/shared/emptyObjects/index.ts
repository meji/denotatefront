import { Category } from "../../categories/domain/category";
import { Tag } from "../../tags/domain/tag";

export const emptyCategory: Partial<Category> = {
  title: "",
  brief: "",
  description: "",
  img: "",
  featured: false
};
export const emptyTag: Partial<Tag> = {
  title: "",
  brief: "",
  description: "",
  img: "",
  featured: false
};
