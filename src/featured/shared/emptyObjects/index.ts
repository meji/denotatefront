import { Category } from "../../categories/domain/category";
import { Tag } from "../../tags/domain/tag";
import { Post } from "../../posts/domain/post";
import { Site } from "../../site/domain/site";

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

export const emptyPost: Partial<Post> = {
  title: "",
  brief: "",
  description: "",
  img: "",
  featured: false,
  author: ""
};
export const emptySite: Partial<Site> = {
  theme: "",
  title: "",
  brief: "",
  logo: "",
  color: "",
  new: true
};
