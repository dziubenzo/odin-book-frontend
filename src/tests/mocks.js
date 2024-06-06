export const user = {
  username: 'testuser',
};

export const post1 = {
  _id: '1',
  author: {
    _id: '1',
    username: 'user1',
  },
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
  comments: [],
  slug: 'post-3',
};
