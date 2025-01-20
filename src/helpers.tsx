import Cookies from 'js-cookie';
import type { NavigateFunction } from 'react-router-dom';
import slugify from 'slugify';
import type { Updater } from 'use-immer';
import API_URL from './API';
import {
  darkTheme,
  MAX_COMMENT_LENGTH,
  MIN_POST_CONTENT_LENGTH,
  MIN_POST_TITLE_LENGTH,
  POSTS_PER_FETCH,
} from './constants';
import type {
  Comment,
  DetailedCategory,
  DetailedPost,
  Post,
  User,
} from './types';

// Log in as guest
export const logInAsGuest = async (
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
) => {
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
  Cookies.set('jwt', token, {
    expires: 3,
    secure: location.protocol === 'https:',
    sameSite: 'Lax',
  });
  navigate('/posts');
};

// Like post
// Handle two cases (post either liked already or not liked)
export const likePost = async (
  post: Post,
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPosts: Updater<Post[] | null>,
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
    if (!draft) return;
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
  post: Post,
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPosts: Updater<Post[] | null>,
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
    if (!draft) return;
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
  post: DetailedPost | null,
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPost: Updater<DetailedPost | null>,
) => {
  if (inProgress || !post) {
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
    if (!draft) return;
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
  post: DetailedPost | null,
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPost: Updater<DetailedPost | null>,
) => {
  if (inProgress || !post) {
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
    if (!draft) return;
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
  post: DetailedPost | null,
  commentID: Comment['_id'],
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPost: Updater<DetailedPost | null>,
) => {
  if (inProgress || !post) {
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
    if (!draft) return;
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
  post: DetailedPost | null,
  commentID: Comment['_id'],
  userID: User['_id'],
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setPost: Updater<DetailedPost | null>,
) => {
  if (inProgress || !post) {
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
    if (!draft) return;
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
  userID: User['_id'],
  post: DetailedPost,
  content: string,
  inProgress: boolean,
  commentFieldRef: React.RefObject<HTMLTextAreaElement | null>,
  setCommentError: React.Dispatch<React.SetStateAction<string>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setContentLength: React.Dispatch<React.SetStateAction<number>>,
  setPost: Updater<DetailedPost | null>,
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
  const updatedPost: DetailedPost = await res.json();
  setPost(updatedPost);
  setIsSubmitted(true);
  if (!commentFieldRef.current) return;
  commentFieldRef.current.value = '';
  setTimeout(() => {
    setIsSubmitted(false);
    setInProgress(false);
    setContent('');
  }, 1000);
  return setContentLength(MAX_COMMENT_LENGTH);
};

// Update user profile (bio and/or avatar)
export const updateUserProfile = async (
  user: User,
  inProgress: boolean,
  bio: User['bio'],
  selectedAvatar: string,
  uploadedAvatar: File | null,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setFeedback: React.Dispatch<React.SetStateAction<string>>,
  setUser: Updater<User | null>,
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>,
  setUploadedAvatar: React.Dispatch<React.SetStateAction<File | null>>,
  setUploadedAvatarPreview: React.Dispatch<React.SetStateAction<string>>,
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
  setUploadedAvatar(null);
  setUploadedAvatarPreview('');
  return setInProgress(false);
};

// Follow/unfollow a category
export const followOrUnfollowCategory = async (
  inProgress: string | null,
  user: User,
  categoryID: DetailedCategory['_id'],
  setInProgress: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setUser: Updater<User | null>,
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
    return setInProgress(null);
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  return setInProgress(null);
};

// Create new category
export const createNewCategory = async (
  inProgress: boolean,
  name: string,
  description: string,
  uploadedIcon: File | null,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setCategoryCreated: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
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
  inProgress: User['_id'] | null,
  user: User,
  userID: User['_id'],
  setInProgress: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setUser: Updater<User | null>,
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
    return setInProgress(null);
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  return setInProgress(null);
};

// Create text post
export const createTextPost = async (
  inProgress: boolean,
  userID: User['_id'],
  title: string,
  content: string,
  category: string,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setPostPublished: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
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
  inProgress: boolean,
  userID: User['_id'],
  title: string,
  imageURL: string,
  imageFile: File | null,
  category: string,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setPostPublished: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
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
  inProgress: boolean,
  userID: User['_id'],
  title: string,
  videoURL: string,
  category: string,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setPostPublished: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
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
  type: 'text' | 'image' | 'video',
  data: FormData,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setPostPublished: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
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
  inProgress: boolean,
  category: string,
  title: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
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
export const isValidImageURL = (string: string) => {
  if (typeof string !== 'string') {
    return false;
  }
  return !!string.match(
    /(http(s?):)([/|.|\w|\s|-])*\.(?:avif|jpg|jpeg|gif|png|webp)/gi,
  );
};

// Set feedback/error message and remove it after the time provided
export const setTimedMessage = (
  message: string,
  setterFunction: React.Dispatch<React.SetStateAction<string>>,
  time = 2000,
) => {
  setterFunction(message);
  return setTimeout(() => {
    setterFunction('');
  }, time);
};

// Fetch more posts (infinite scroll)
export const fetchMorePosts = async (
  endpoint: string,
  limit: number,
  skip: number,
  setPosts: Updater<Post[] | null>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const res = await fetch(
    `${API_URL}${endpoint}${
      endpoint[endpoint.length - 1] === '/'
        ? `?limit=${limit}&skip=${skip}`
        : `&limit=${limit}&skip=${skip}`
    }`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    },
  );
  const morePosts: Post[] = await res.json();
  setPosts((previousPosts) => {
    if (!previousPosts) return;
    return [...previousPosts, ...morePosts];
  });
  if (morePosts.length === POSTS_PER_FETCH) {
    setHasMore(true);
  } else {
    setHasMore(false);
  }
  return;
};

// Prevent Enter from inserting a next line
export const disableEnter = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

// Move caret to the end of the comment textarea
export const moveCaretToEnd = (commentTextArea: HTMLTextAreaElement) => {
  commentTextArea.focus();
};

// Check if the app is browsed on a mobile browser
export const isMobile = () => {
  return document.body.clientWidth < parseInt(darkTheme.mobile);
};
