import { defaultAvatars } from '../constants';
import type {
  DetailedCategory,
  DetailedPost,
  DetailedUser,
  Post,
  User,
} from '../types';

/* 
Users
*/

export const superUser = {
  _id: '0',
  username: 'superUser',
  avatar: defaultAvatars[0],
  bio: 'I am the SUPER USER!',
  registered_at: new Date(),
  followed_categories: [],
  followed_users: [],
  __v: 0,
} as const satisfies User;

export const user1 = {
  ...superUser,
  _id: '1',
  username: 'user1',
} as const satisfies User;

export const user2 = {
  ...superUser,
  _id: '2',
  username: 'user2',
  bio: 'Bio Bio Bio Yo Yo Yo!',
} as const satisfies User;

export const user3 = {
  ...superUser,
  _id: '3',
  username: 'user3',
  avatar: 'https://www.example.com/super_avatar.png',
  followed_categories: ['1'],
  followed_users: ['2'],
} as const satisfies User;

export const detailedUser1 = {
  ...superUser,
  _id: '4',
  username: 'user4',
  bio: 'I have a bio, yo!',
  avatar: 'https://www.example.com/super_avatar.png',
  followed_categories: ['1'],
  followed_users: ['2', '3'],
  postsCount: 0,
  postLikesCount: 0,
  postDislikesCount: 0,
  commentsCount: 0,
  commentLikesCount: 0,
  commentDislikesCount: 0,
  followersCount: 0,
} as const satisfies DetailedUser;

export const detailedUser2 = {
  ...superUser,
  _id: '5',
  username: 'user5',
  bio: '',
  avatar: 'https://www.example.com/super_avatar.png',
  postsCount: 999,
  postLikesCount: 999,
  postDislikesCount: 999,
  commentsCount: 999,
  commentLikesCount: 999,
  commentDislikesCount: 999,
  followersCount: 999,
} as const satisfies DetailedUser;

/* 
Categories
*/

export const category1 = {
  _id: '1',
  name: 'Category 1',
  icon: 'https://www.example.com/super_icon.png',
  description: 'Category 1 description',
  created_at: new Date(),
  slug: 'category-1',
  postsCount: 99,
  followersCount: 99,
  __v: 0,
} as const satisfies DetailedCategory;

export const category2 = {
  ...category1,
  _id: '2',
  name: 'Category 2',
  description: 'Category 2 description',
  slug: 'category-2',
} as const satisfies DetailedCategory;

/* 
Posts
*/

export const post1 = {
  _id: '1',
  author: user1,
  title: 'Post 1',
  content: 'Post 1 Content',
  category: {
    name: 'category1',
    slug: 'category1',
  },
  created_at: new Date(),
  likes: ['1', '2', '3'],
  dislikes: ['1', '2'],
  comments: [],
  slug: 'post-1',
  __v: 0,
} as const satisfies Post;

export const post2 = {
  _id: '2',
  author: {
    username: 'user2',
    avatar: '',
  },
  title: 'Post 2',
  content: 'Post 2 Content',
  category: {
    name: 'category2',
    slug: 'category2',
  },
  created_at: new Date(),
  likes: ['1', '2', '3', '4', '5'],
  dislikes: ['1', '2'],
  comments: [],
  slug: 'post-2',
  __v: 0,
} as const satisfies Post;

export const post3 = {
  _id: '3',
  author: {
    username: 'user3',
    avatar: '',
  },
  title: 'Post 3',
  content: 'Post 3 Content',
  category: {
    name: 'category3',
    slug: 'category3',
  },
  created_at: new Date(),
  likes: [],
  dislikes: ['1', '2', '3', '4', '5'],
  comments: ['A', 'B', 'C', 'D'],
  slug: 'post-3',
  __v: 0,
} as const satisfies Post;

/* 
Detailed post
*/

export const detailedPost1 = {
  _id: '3',
  author: {
    username: 'user1',
    avatar: '',
  },
  title: 'Post 1 Detailed',
  content: 'Post 1 Detailed Content',
  category: {
    name: 'category1',
    slug: 'category1',
  },
  created_at: new Date(),
  likes: ['1'],
  dislikes: ['0'],
  comments: [
    {
      _id: '1',
      author: {
        username: 'user1',
        avatar: '',
      },
      created_at: new Date(),
      content: 'Comment Content 1',
      likes: ['1'],
      dislikes: ['0', '5', '7'],
      __v: 0,
    },
    {
      _id: '2',
      author: {
        username: 'user1',
        avatar: '',
      },
      created_at: new Date(),
      content: 'Comment Content 2',
      likes: ['0'],
      dislikes: [],
      __v: 0,
    },
    {
      _id: '3',
      author: {
        username: 'superUser',
        avatar: '',
      },
      created_at: new Date(),
      content: 'Comment Content 3',
      likes: [],
      dislikes: ['0', '1'],
      __v: 0,
    },
  ],
  slug: 'post-3',
  __v: 0,
} as const satisfies DetailedPost;

/* 
Miscellaneous
*/

export const longComment =
  'I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment...';

export const longBio =
  'I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for. I am too long to achieve what I hope for.';

export const longDescription =
  'I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description...';

export const longPostTitle =
  'I am a very long post title. I am a very long post title. I am a very long post title. I am a very long post title. I am a very long post title. I am a very long post title.';

export const USER_STATS_COUNT = 9;
export const CATEGORY_STATS_COUNT = 2;

export const goodImageURL = 'https://www.example.com/cool_image.gif';
export const badImageURL = 'https://www.example.com/virus.exe';

export const goodYouTubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const goodYouTubeLinkID = 'dQw4w9WgXcQ';
export const badYouTubeLink = 'https://www.example.com/watch?v=dQw4w94444234';
