import API_URL from './API';
import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

  return [user, setUser];
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
