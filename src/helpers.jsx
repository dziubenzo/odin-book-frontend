import API_URL from './API';
import Cookies from 'js-cookie';

/* 
Constants
*/

export const MIN_COMMENT_LENGTH = 3;
export const MAX_COMMENT_LENGTH = 320;

/* 
Functions
*/

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
    setCommentError('Comment is too short');
    setTimeout(() => {
      setCommentError('');
    }, 2000);
    return;
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
    setCommentError(error);
    setTimeout(() => {
      setCommentError('');
    }, 2000);
    return setInProgress(false);
  }
  const updatedPost = await res.json();
  setPost(updatedPost);
  setIsSubmitted(true);
  setTimeout(() => {
    setIsSubmitted(false);
  }, 2000);
  commentFieldRef.current.textContent = '';
  setContent('');
  setContentLength(MAX_COMMENT_LENGTH);
  return setInProgress(false);
};