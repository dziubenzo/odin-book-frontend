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

export type Category = {
  _id: string;
  name: string;
  icon: string;
  description: string;
  created_at: Date;
  slug: string;
  __v: number;
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
};

export type DetailedPost = Omit<Post, 'comments'> & {
  comments: Comment[];
};

type PostAuthor = Pick<User, 'username' | 'avatar'>;
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
