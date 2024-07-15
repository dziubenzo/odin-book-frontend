import API_URL from './API';
import Cookies from 'js-cookie';
import slugify from 'slugify';

/* 
Constants
*/

export const MIN_COMMENT_LENGTH = 3;
export const MAX_COMMENT_LENGTH = 320;
export const MAX_BIO_LENGTH = 320;
export const MIN_CATEGORY_NAME_LENGTH = 3;
export const MAX_CATEGORY_NAME_LENGTH = 32;
export const MIN_CATEGORY_DESCRIPTION_LENGTH = 3;
export const MAX_CATEGORY_DESCRIPTION_LENGTH = 320;
export const MIN_POST_TITLE_LENGTH = 3;
export const MAX_POST_TITLE_LENGTH = 64;
export const MIN_POST_CONTENT_LENGTH = 8;
export const POSTS_PER_FETCH = 15;
export const SHRINK_HEADER_SCROLL_VALUE = 100;

export const defaultAvatars = [
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/b0heqsns8cpkyjzm1bsd.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/dfmwqquwvyavf4v31wcg.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/kqrc0rjjpz18d0rz0lhw.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/cpwima9dqagdfywemsop.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/mxppgtj6ahub99iimrii.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/d8lormu9xhhiyendqm0v.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/kvvaddcwsv0at8xdkunu.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111758/odin_book/avatars/default/akap5kaki53sgmkhqekz.png',
];

export const defaultCategoryIcon =
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1719224975/odin_book/category_icons/default/yx1nunw6khsgatgbqczt.png';

export const allowedImageFormats = [
  'image/avif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

/* 
Functions
*/

// Log in as guest
export const logInAsGuest = async (setIsLoggingIn, navigate) => {
  const guestUser = {
    username: 'TOP',
    password: '12345678',
  };
  setIsLoggingIn(true);
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify(guestUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    return setIsLoggingIn(false);
  }
  // Create a cookie with API-signed JWT
  const token = await res.json();
  setIsLoggingIn(false);
  Cookies.set('jwt', token, { expires: 3, secure: true });
  navigate('/posts');
};

// Like post
// Handle two cases (post either liked already or not liked)
export const likePost = async (
  post,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPosts,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const postSlug = post.slug;
  const res = await fetch(`${API_URL}/posts/${post.slug}/like`, {
    method: 'PUT',
    body: JSON.stringify({ user: userID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPosts(null);
    return setInProgress(false);
  }
  setPosts((draft) => {
    const [post] = draft.filter((post) => post.slug === postSlug);
    // Post already liked
    if (post.likes.includes(userID)) {
      const likeIndex = post.likes.indexOf(userID);
      post.likes.splice(likeIndex, 1);
      return;
    }
    // Post not liked
    post.likes.push(userID);

    const dislikeIndex = post.dislikes.indexOf(userID);
    if (dislikeIndex !== -1) {
      post.dislikes.splice(dislikeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Dislike post
// Handle two cases (post either disliked already or not disliked)
export const dislikePost = async (
  post,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPosts,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const postSlug = post.slug;
  const res = await fetch(`${API_URL}/posts/${post.slug}/dislike`, {
    method: 'PUT',
    body: JSON.stringify({ user: userID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPosts(null);
    return setInProgress(false);
  }
  setPosts((draft) => {
    const [post] = draft.filter((post) => post.slug === postSlug);
    // Post already disliked
    if (post.dislikes.includes(userID)) {
      const dislikeIndex = post.dislikes.indexOf(userID);
      post.dislikes.splice(dislikeIndex, 1);
      return;
    }
    // Post not disliked
    post.dislikes.push(userID);

    const likeIndex = post.likes.indexOf(userID);
    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Like post (Post Details page)
// Handle two cases (post either liked already or not liked)
export const likeSinglePost = async (
  post,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPost,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const res = await fetch(`${API_URL}/posts/${post.slug}/like`, {
    method: 'PUT',
    body: JSON.stringify({ user: userID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPost(null);
    return setInProgress(false);
  }
  setPost((draft) => {
    // Post already liked
    if (draft.likes.includes(userID)) {
      const likeIndex = draft.likes.indexOf(userID);
      draft.likes.splice(likeIndex, 1);
      return;
    }
    // Post not liked
    draft.likes.push(userID);

    const dislikeIndex = draft.dislikes.indexOf(userID);
    if (dislikeIndex !== -1) {
      draft.dislikes.splice(dislikeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Dislike post (Post Details page)
// Handle two cases (post either disliked already or not disliked)
export const dislikeSinglePost = async (
  post,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPost,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const res = await fetch(`${API_URL}/posts/${post.slug}/dislike`, {
    method: 'PUT',
    body: JSON.stringify({ user: userID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPost(null);
    return setInProgress(false);
  }
  setPost((draft) => {
    // Post already disliked
    if (draft.dislikes.includes(userID)) {
      const dislikeIndex = draft.dislikes.indexOf(userID);
      draft.dislikes.splice(dislikeIndex, 1);
      return;
    }
    // Post not disliked
    draft.dislikes.push(userID);

    const likeIndex = draft.likes.indexOf(userID);
    if (likeIndex !== -1) {
      draft.likes.splice(likeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Like comment
// Handle two cases (comment either liked already or not liked)
export const likeComment = async (
  post,
  commentID,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPost,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const res = await fetch(
    `${API_URL}/posts/${post.slug}/comments/${commentID}/like`,
    {
      method: 'PUT',
      body: JSON.stringify({ user: userID }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    },
  );
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPost(null);
    return setInProgress(false);
  }
  setPost((draft) => {
    const [comment] = draft.comments.filter(
      (comment) => comment._id === commentID,
    );
    // Comment already liked
    if (comment.likes.includes(userID)) {
      const likeIndex = comment.likes.indexOf(userID);
      comment.likes.splice(likeIndex, 1);
      return;
    }
    // Comment not liked
    comment.likes.push(userID);

    const dislikeIndex = comment.dislikes.indexOf(userID);
    if (dislikeIndex !== -1) {
      comment.dislikes.splice(dislikeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Dislike comment
// Handle two cases (comment either disliked already or not disliked)
export const dislikeComment = async (
  post,
  commentID,
  userID,
  inProgress,
  setInProgress,
  setError,
  setPost,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const res = await fetch(
    `${API_URL}/posts/${post.slug}/comments/${commentID}/dislike`,
    {
      method: 'PUT',
      body: JSON.stringify({ user: userID }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    },
  );
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    setPost(null);
    return setInProgress(false);
  }
  setPost((draft) => {
    const [comment] = draft.comments.filter(
      (comment) => comment._id === commentID,
    );
    // Comment already disliked
    if (comment.dislikes.includes(userID)) {
      const dislikeIndex = comment.dislikes.indexOf(userID);
      comment.dislikes.splice(dislikeIndex, 1);
      return;
    }
    // Comment not disliked
    comment.dislikes.push(userID);

    const likeIndex = comment.likes.indexOf(userID);
    if (likeIndex !== -1) {
      comment.likes.splice(likeIndex, 1);
    }
  });
  return setInProgress(false);
};

// Create post comment
export const createComment = async (
  userID,
  post,
  content,
  inProgress,
  commentFieldRef,
  setCommentError,
  setInProgress,
  setIsSubmitted,
  setContent,
  setContentLength,
  setPost,
) => {
  if (inProgress) {
    return;
  }
  if (content.trim().length <= 2) {
    return setTimedMessage('Comment is too short', setCommentError);
  }
  setInProgress(true);
  const res = await fetch(`${API_URL}/posts/${post.slug}/comments`, {
    method: 'POST',
    body: JSON.stringify({ author: userID, content }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setTimedMessage(error, setCommentError);
    return setInProgress(false);
  }
  const updatedPost = await res.json();
  setPost(updatedPost);
  setIsSubmitted(true);
  setTimeout(() => {
    setIsSubmitted(false);
    setInProgress(false);
    commentFieldRef.current.textContent = '';
    setContent('');
  }, 2000);
  return setContentLength(MAX_COMMENT_LENGTH);
};

// Update user profile (bio and/or avatar)
export const updateUserProfile = async (
  user,
  inProgress,
  bio,
  selectedAvatar,
  uploadedAvatar,
  setInProgress,
  setFeedback,
  setUser,
  setSelectedAvatar,
  setUploadedAvatar,
  setUploadedAvatarPreview,
) => {
  if (inProgress) {
    return;
  }
  if ((!bio || bio.trim() === user.bio) && !selectedAvatar && !uploadedAvatar) {
    return setTimedMessage('Change something first!', setFeedback);
  }
  setInProgress(true);
  const data = new FormData();
  if (bio) {
    data.append('bio', bio);
  }
  if (selectedAvatar) {
    data.append('avatar', selectedAvatar);
  }
  if (uploadedAvatar) {
    data.append('uploaded_avatar', uploadedAvatar);
  }
  const res = await fetch(`${API_URL}/users/${user.username}/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setTimedMessage(error, setFeedback);
    return setInProgress(false);
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  setTimedMessage('Profile updated successfully!', setFeedback);
  setSelectedAvatar('');
  setUploadedAvatar('');
  setUploadedAvatarPreview('');
  return setInProgress(false);
};

// Follow/unfollow a category
export const followOrUnfollowCategory = async (
  inProgress,
  user,
  categoryID,
  setInProgress,
  setError,
  setUser,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(categoryID);
  const res = await fetch(`${API_URL}/users/${user.username}/update_category`, {
    method: 'PUT',
    body: JSON.stringify({ category_id: categoryID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    return setInProgress(false);
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  return setInProgress(false);
};

// Create new category
export const createNewCategory = async (
  inProgress,
  name,
  description,
  uploadedIcon,
  setInProgress,
  setError,
  setCategoryCreated,
  navigate,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(true);
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (uploadedIcon) {
    data.append('uploaded_icon', uploadedIcon);
  }
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setTimedMessage(error, setError);
    return setInProgress(false);
  }
  setCategoryCreated(true);
  setTimeout(() => {
    navigate(`/categories/${slugify(name, { lower: true })}`);
  }, 2000);
  return setInProgress(false);
};

// Follow/unfollow a user
export const followOrUnfollowUser = async (
  inProgress,
  user,
  userID,
  setInProgress,
  setError,
  setUser,
) => {
  if (inProgress) {
    return;
  }
  setInProgress(userID);
  const res = await fetch(`${API_URL}/users/${user.username}/update_user`, {
    method: 'PUT',
    body: JSON.stringify({ user_id: userID }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setError(error);
    return setInProgress(false);
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  return setInProgress(false);
};

// Create text post
export const createTextPost = async (
  inProgress,
  userID,
  title,
  content,
  category,
  setInProgress,
  setErrorMessage,
  setPostPublished,
  navigate,
) => {
  if (areCommonFieldsInvalid(inProgress, category, title, setErrorMessage)) {
    return;
  }
  if (content.length < MIN_POST_CONTENT_LENGTH) {
    return setTimedMessage('Post content is too short', setErrorMessage);
  }
  setInProgress(true);
  const data = new FormData();
  data.append('author', userID);
  data.append('title', title);
  data.append('category', category);
  data.append('content', content);
  await submitPost(
    'text',
    data,
    setErrorMessage,
    setInProgress,
    setPostPublished,
    navigate,
  );
};

// Create image post
export const createImagePost = async (
  inProgress,
  userID,
  title,
  imageURL,
  imageFile,
  category,
  setInProgress,
  setErrorMessage,
  setPostPublished,
  navigate,
) => {
  if (areCommonFieldsInvalid(inProgress, category, title, setErrorMessage)) {
    return;
  }
  if (!imageURL && !imageFile) {
    return setTimedMessage('No image file provided', setErrorMessage);
  }
  const data = new FormData();
  // Handle image URL and image file slightly differently
  if (imageURL) {
    if (!isValidImageURL(imageURL)) {
      return setTimedMessage('Invalid image URL', setErrorMessage);
    }
    data.append('content', imageURL);
  }
  if (imageFile) {
    data.append('content', 'I am a file, leave me alone!');
    data.append('uploaded_image', imageFile);
  }
  setInProgress(true);
  data.append('author', userID);
  data.append('title', title);
  data.append('category', category);
  await submitPost(
    'image',
    data,
    setErrorMessage,
    setInProgress,
    setPostPublished,
    navigate,
  );
};

// Create video post
export const createVideoPost = async (
  inProgress,
  userID,
  title,
  videoURL,
  category,
  setInProgress,
  setErrorMessage,
  setPostPublished,
  navigate,
) => {
  if (areCommonFieldsInvalid(inProgress, category, title, setErrorMessage)) {
    return;
  }
  if (!videoURL) {
    return setTimedMessage('Invalid YouTube URL', setErrorMessage);
  }
  setInProgress(true);
  const data = new FormData();
  data.append('author', userID);
  data.append('title', title);
  data.append('category', category);
  data.append('content', videoURL);
  await submitPost(
    'video',
    data,
    setErrorMessage,
    setInProgress,
    setPostPublished,
    navigate,
  );
};

// Handle create post submission
const submitPost = async (
  type,
  data,
  setErrorMessage,
  setInProgress,
  setPostPublished,
  navigate,
) => {
  const res = await fetch(`${API_URL}/posts/?type=${type}`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setTimedMessage(error, setErrorMessage);
    return setInProgress(false);
  }
  const newPost = await res.json();
  setPostPublished(true);
  setTimeout(() => {
    navigate(`/posts/${newPost.slug}`);
  }, 2000);
  // Clear the session storage only after navigating to the new post page
  setTimeout(() => {
    sessionStorage.clear();
  }, 4000);
  return setInProgress(false);
};

// Validate fields common to all post types
const areCommonFieldsInvalid = (
  inProgress,
  category,
  title,
  setErrorMessage,
) => {
  if (inProgress) {
    return true;
  }
  if (title.length < MIN_POST_TITLE_LENGTH) {
    setTimedMessage('Post title is too short', setErrorMessage);
    return true;
  }
  if (!category) {
    setTimedMessage('Category is not chosen', setErrorMessage);
    return true;
  }
  return false;
};

// Check if the URL provided is a valid image
export const isValidImageURL = (string) => {
  if (typeof string !== 'string') {
    return false;
  }
  return !!string.match(
    /(http(s?):)([/|.|\w|\s|-])*\.(?:avif|jpg|jpeg|gif|png|webp)/gi,
  );
};

// Set feedback/error message and remove it after the time provided
export const setTimedMessage = (message, setterFunction, time = 2000) => {
  setterFunction(message);
  return setTimeout(() => {
    setterFunction('');
  }, time);
};

// Fetch more posts (infinite scroll)
export const fetchMorePosts = async (
  endpoint,
  limit,
  skip,
  setPosts,
  setHasMore,
) => {
  const res = await fetch(
    endpoint +
      (endpoint[endpoint.length - 1] === '/'
        ? `?limit=${limit}&skip=${skip}`
        : `&limit=${limit}&skip=${skip}`),

    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    },
  );
  const morePosts = await res.json();
  setPosts((previousPosts) => [...previousPosts, ...morePosts]);
  morePosts.length === POSTS_PER_FETCH ? setHasMore(true) : setHasMore(false);
  return;
};

// Prevent Enter from inserting a next line
export const disableEnter = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
