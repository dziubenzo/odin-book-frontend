import API_URL from './API';
import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SHRINK_HEADER_SCROLL_VALUE } from './helpers';

// Authenticate user based on JWT stored in a cookie
// Set user state if auth successful
export const useAuthUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useImmer('');

  useEffect(() => {
    async function authUser() {
      const res = await fetch(`${API_URL}/users/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      });
      if (!res.ok) {
        return navigate('/');
      }
      const user = await res.json();
      setUser(user);
    }
    authUser();
  }, []);

  return { user, setUser };
};

// Check user authentication (Welcome Page)
// Show Welcome Page if auth unsuccessful
// Redirect to /posts if auth successful
export const useCheckAuth = (setShowPage) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${API_URL}/users/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      });
      if (!res.ok) {
        setShowPage(true);
        return;
      }
      return navigate('/posts');
    }
    checkAuth();
  }, []);
};

// Fetch page data
export const useFetchPageData = (endpoint) => {
  const [data, setData] = useImmer(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setData(null);
      setError(null);
      const res = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        setLoading(false);
        return setError(error);
      }
      const data = await res.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [endpoint]);

  return { data, setData, loading, error, setError };
};

// Fetch initial posts (infinite scroll)
export const useFetchPosts = (endpoint, limit) => {
  const [posts, setPosts] = useImmer(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setPosts(null);
      setError(null);
      setHasMore(true);
      const res = await fetch(
        endpoint +
          (endpoint[endpoint.length - 1] === '/'
            ? `?limit=${limit}`
            : `&limit=${limit}`),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        setLoading(false);
        return setError(error);
      }
      const posts = await res.json();
      setPosts(posts);
      setLoading(false);
    }
    fetchPosts();
  }, [endpoint]);

  return { posts, setPosts, loading, error, setError, hasMore, setHasMore };
};

// Show Leave Page dialog if any field is not empty
// Save fields to session storage and retrieve them on page load
export const usePreserveState = (
  loading,
  postType,
  title,
  category,
  content,
  imageURL,
  videoURL,
  setPostType,
  setTitle,
  setCategory,
  setContent,
  setImageURL,
  setVideoURL,
) => {
  useEffect(() => {
    if (loading) {
      setPostType(sessionStorage.getItem('postType') || postType);
      setTitle(sessionStorage.getItem('title') || '');
      setCategory(sessionStorage.getItem('category') || '');
      setContent(sessionStorage.getItem('content') || '');
      setImageURL(sessionStorage.getItem('imageURL') || '');
      setVideoURL(sessionStorage.getItem('videoURL') || '');
    }

    function triggerLeavePageDialog(event) {
      event.preventDefault();
      event.returnValue = true;
    }

    if (title || content || category || imageURL || videoURL) {
      window.addEventListener('beforeunload', triggerLeavePageDialog);
    }

    return () => {
      window.removeEventListener('beforeunload', triggerLeavePageDialog);
      if (!loading) {
        sessionStorage.setItem('postType', postType);
        sessionStorage.setItem('title', title);
        sessionStorage.setItem('category', category);
        sessionStorage.setItem('content', content);
        sessionStorage.setItem('imageURL', imageURL);
        sessionStorage.setItem('videoURL', videoURL);
      }
    };
  }, [postType, title, category, content, imageURL, videoURL]);
};

// Shrink the header on reaching the specified scroll value
// Restore to default if the scroll value is smaller than the specified value
export const useShrinkHeader = () => {
  const [isSmaller, setIsSmaller] = useState(false);

  useEffect(() => {
    const adjustHeader = () => {
      if (document.documentElement.scrollTop > SHRINK_HEADER_SCROLL_VALUE) {
        return setIsSmaller(true);
      }
      setIsSmaller(false);
    };
    window.addEventListener('scroll', adjustHeader);
    return () => {
      window.removeEventListener('scroll', adjustHeader);
    };
  }, []);

  return isSmaller;
};

// Save the initial theme value (dark) to the local storage
// Otherwise read the theme value from the local storage
export const useThemeValue = (setTheme) => {
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      return setTheme('dark');
    }
    setTheme(localStorage.getItem('theme'));
  }, []);
};

// Pass the error to the parent component so that the entire page throws an error
// Ensure that the fetch of a resource and the fetch of posts are in sync
export const useSyncWithParent = (
  error,
  loading,
  setResourceError,
  setLoadingResource,
) => {
  useEffect(() => {
    if (error) {
      setResourceError(error);
    }
    if (loading) {
      setLoadingResource(true);
    }
    if (!loading) {
      setLoadingResource(false);
    }
  }, [loading, error]);
};

// Sort posts
export const useSortPosts = (posts, setPosts) => {
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (posts) {
      switch (sortBy) {
        case 'newest':
          // Pass a new array to the setter function to ensure rerender
          setPosts(
            posts.toSorted(
              (a, b) => new Date(b.created_at) - new Date(a.created_at),
            ),
          );
          break;
        case 'oldest':
          setPosts(
            posts.toSorted(
              (a, b) => new Date(a.created_at) - new Date(b.created_at),
            ),
          );
          break;
        case 'likes':
          setPosts(
            posts.toSorted(
              (a, b) =>
                b.likes.length -
                b.dislikes.length -
                (a.likes.length - a.dislikes.length),
            ),
          );
          break;
        case 'comments':
          setPosts(
            posts.toSorted((a, b) => b.comments.length - a.comments.length),
          );
          break;
      }
    }
  }, [sortBy, posts?.length]);

  return { sortBy, setSortBy };
};
