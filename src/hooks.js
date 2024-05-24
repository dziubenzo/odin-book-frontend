import API_URL from './API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Authenticate user based on JWT stored in a cookie
// Set user state if auth successful
export const useAuthUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

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
// Redirect to /home if auth successful
export const useCheckAuth = () => {
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
        return;
      }
      return navigate('/posts');
    }
    checkAuth();
  }, []);
};
