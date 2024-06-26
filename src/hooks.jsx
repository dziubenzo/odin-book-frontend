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
  }, []);

  return { data, setData, loading, error, setError };
};

// Show Leave Page dialog if any field is not empty
// Save fields to session storage and retrieve them on page load
export const usePreserveState = (
  loading,
  postType,
  title,
  category,
  content,
  setPostType,
  setTitle,
  setCategory,
  setContent,
) => {
  useEffect(() => {
    if (loading) {
      setPostType(sessionStorage.getItem('postType') || postType);
      setTitle(sessionStorage.getItem('title') || '');
      setCategory(sessionStorage.getItem('category') || '');
      setContent(sessionStorage.getItem('content') || '');
    }

    function triggerLeavePageDialog(event) {
      event.preventDefault();
      event.returnValue = true;
    }

    if (title || content || category) {
      window.addEventListener('beforeunload', triggerLeavePageDialog);
    }

    return () => {
      window.removeEventListener('beforeunload', triggerLeavePageDialog);
      if (!loading) {
        sessionStorage.setItem('postType', postType);
        sessionStorage.setItem('title', title);
        sessionStorage.setItem('category', category);
        sessionStorage.setItem('content', content);
      }
    };
  }, [postType, title, category, content]);
};
