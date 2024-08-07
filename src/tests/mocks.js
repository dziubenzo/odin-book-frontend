import { defaultAvatars } from '../helpers';

/* 
Users
*/

export const superUser = {
  _id: '0',
  username: 'superUser',
};

export const user1 = {
  _id: '1',
  username: 'user1',
};

export const user2 = {
  _id: '2',
  username: 'user2',
  avatar: defaultAvatars[0],
  bio: 'Bio Bio Bio Yo Yo Yo!',
  registered_at: Date.now(),
  followed_categories: [],
  followed_users: [],
};

export const user3 = {
  _id: '3',
  username: 'user3',
  avatar: 'https://www.example.com/super_avatar.png',
  followed_categories: ['1'],
  followed_users: ['2'],
};

export const user4 = {
  _id: '4',
  username: 'user4',
  bio: 'I have a bio, yo!',
  registered_at: Date.now(),
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
};

export const user5 = {
  _id: '5',
  username: 'user5',
  bio: '',
  registered_at: Date.now(),
  avatar: 'https://www.example.com/super_avatar.png',
  followed_categories: [],
  followed_users: [],
  postsCount: 999,
  postLikesCount: 999,
  postDislikesCount: 999,
  commentsCount: 999,
  commentLikesCount: 999,
  commentDislikesCount: 999,
  followersCount: 999,
};

/* 
Categories
*/

export const category1 = {
  _id: '1',
  name: 'Category 1',
  icon: 'https://www.example.com/super_icon.png',
  description: 'Category 1 description',
  created_at: Date.now(),
  slug: 'category-1',
  postsCount: 99,
  followersCount: 99,
};

export const category2 = {
  ...category1,
  _id: '2',
  name: 'Category 2',
  description: 'Category 2 description',
  slug: 'category-2',
};

/* 
Posts
*/

export const post1 = {
  _id: '1',
  author: user1,
  title: 'Post 1',
  content: 'Post 1 Content',
  category: {
    _id: '1',
    name: 'category1',
    slug: 'category1',
  },
  created_at: Date.now(),
  likes: ['1', '2', '3'],
  dislikes: ['1', '2'],
  comments: [],
  slug: 'post-1',
};

export const post2 = {
  _id: '2',
  author: {
    _id: '2',
    username: 'user2',
  },
  title: 'Post 2',
  content: 'Post 2 Content',
  category: {
    _id: '2',
    name: 'category2',
    slug: 'category2',
  },
  created_at: Date.now(),
  likes: ['1', '2', '3', '4', '5'],
  dislikes: ['1', '2'],
  comments: [],
  slug: 'post-2',
};

export const post3 = {
  _id: '3',
  author: {
    _id: '3',
    username: 'user3',
  },
  title: 'Post 3',
  content: 'Post 3 Content',
  category: {
    _id: '3',
    name: 'category3',
    slug: 'category3',
  },
  created_at: Date.now(),
  likes: [],
  dislikes: ['1', '2', '3', '4', '5'],
  comments: ['A', 'B', 'C', 'D'],
  slug: 'post-3',
};

/* 
Detailed post
*/

export const detailedPost1 = {
  _id: '3',
  author: {
    _id: '1',
    username: 'user1',
  },
  title: 'Post 1 Detailed',
  content: 'Post 1 Detailed Content',
  category: {
    _id: '1',
    name: 'category1',
    slug: 'category1',
  },
  created_at: Date.now(),
  likes: ['1'],
  dislikes: ['0'],
  comments: [
    {
      _id: '1',
      author: {
        _id: '1',
        username: 'user1',
      },
      created_at: Date.now(),
      content: 'Comment Content 1',
      likes: ['1'],
      dislikes: ['0', '5', '7'],
    },
    {
      _id: '2',
      author: {
        _id: '1',
        username: 'user1',
      },
      created_at: Date.now(),
      content: 'Comment Content 2',
      likes: ['0'],
      dislikes: [],
    },
    {
      _id: '3',
      author: {
        _id: '0',
        username: 'superUser',
      },
      created_at: Date.now(),
      content: 'Comment Content 3',
      likes: [],
      dislikes: ['0', '1'],
    },
  ],
  slug: 'post-3',
};

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
