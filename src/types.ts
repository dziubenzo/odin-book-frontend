import type { Updater } from 'use-immer';
import { darkTheme, lightTheme } from './constants';

export type User = {
  _id: string;
  username: string;
  registered_at: Date;
  avatar: string;
  bio: string;
  followed_users: User['_id'][];
  followed_categories: Category['_id'][];
  __v: number;
};

export type DetailedUser = User & {
  postsCount: number;
  postLikesCount: number;
  postDislikesCount: number;
  commentsCount: number;
  commentLikesCount: number;
  commentDislikesCount: number;
  followersCount: number;
};

export type Category = {
  _id: string;
  name: string;
  icon: string;
  description: string;
  created_at: Date;
  slug: string;
  __v: number;
};

export type DetailedCategory = Category & {
  postsCount: number;
  followersCount: number;
};

export type Post = {
  _id: string;
  author: PostAuthor;
  title: string;
  content: string;
  category: PostCategory;
  created_at: Date;
  likes: User['_id'][];
  dislikes: User['_id'][];
  comments: Comment['_id'][];
  slug: string;
  __v: number;
};

export type DetailedPost = Omit<Post, 'comments'> & {
  comments: Comment[];
};

export type PostAuthor = Pick<User, 'username' | 'avatar'>;
type PostCategory = Pick<Category, 'name' | 'slug'>;

export type Comment = {
  _id: string;
  author: CommentAuthor;
  content: string;
  created_at: Date;
  likes: User['_id'][];
  dislikes: User['_id'][];
  __v: number;
};

type CommentAuthor = PostAuthor;

export type OutletContext = {
  user: User;
  setUser: Updater<User | null>;
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

export type ThemeObject = typeof darkTheme & typeof lightTheme;

export type ThemeValue = 'light' | 'dark';

export type PostType = 'text' | 'image' | 'video';

export type SortBy = 'newest' | 'oldest' | 'likes' | 'comments';
