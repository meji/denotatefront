import {Category} from '../../categories/domain/category';
import {Tag} from '../../tags/domain/tag';
import {Post} from '../../posts/domain/post';
import {Site} from '../../site/domain/site';
import {User} from '../../users/domain/user';

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
  author: "",
  tags: [],
  cats: []
};
export const emptySite: Partial<Site> = {
  theme: "light",
  title: "",
  brief: "",
  logo: "",
  color: "#4bac95",
  new: true
};

export const emptyUser: Partial<User> = {
  login: "",
  password: "",
  email: "",
  firstName: "",
  secondName: ""
};
