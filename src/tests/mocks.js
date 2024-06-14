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
  avatar: 'https://www.example.com/super_avatar.png',
  bio: 'Bio Bio Bio Yo Yo Yo!',
  registered_at: Date.now(),
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
    _id: 1,
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
    _id: 2,
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
    _id: 3,
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
    _id: 1,
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

export const longComment =
  'I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment. I am a long comment...';
