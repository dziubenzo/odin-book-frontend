import Cookies from 'js-cookie';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { type Updater, useImmer } from 'use-immer';
import API_URL from './API';
import { SHRINK_HEADER_SCROLL_VALUE } from './constants';
import type { OutletContext, Post, PostType, SortBy, User } from './types';

// Authenticate user based on JWT stored in a cookie
// Set user state if auth successful
export const useAuthUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useImmer<User | null>(null);

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
      const user: User = await res.json();
      setUser(user);
    }
    authUser();
  }, []);

  return { user, setUser };
};

// Wrapper for the useOutletContext hook that makes sure the user object cannot be null
export const useUserAndTheme = () => {
  const { user, setUser, theme, setTheme } = useOutletContext<OutletContext>();

  if (!user) throw new Error('Something went wrong');

  return { user, setUser, theme, setTheme };
};

// Check user authentication (Welcome Page)
// Show Welcome Page if auth unsuccessful
// Redirect to /posts if auth successful
export const useCheckAuth = (
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
export const useFetchPageData = <T,>(endpoint: string) => {
  const [data, setData] = useImmer<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const error = (await res.json()) as string;
        setLoading(false);
        return setError(error);
      }
      const data: T = await res.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [endpoint]);

  return { data, setData, loading, error, setError };
};

// Fetch initial posts (infinite scroll)
export const useFetchPosts = (endpoint: string, limit: number) => {
  const [posts, setPosts] = useImmer<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  return {
    posts,
    setPosts,
    loading,
    error,
    setError,
    hasMore,
    setHasMore,
  };
};

// Show Leave Page dialog if any field is not empty
// Save fields to session storage and retrieve them on page load
export const usePreserveState = (loading: boolean) => {
  const [postType, setPostType] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    if (loading) {
      const savedPostType = sessionStorage.getItem('postType');
      if (
        savedPostType === 'text' ||
        savedPostType === 'image' ||
        savedPostType === 'video'
      ) {
        setPostType(savedPostType);
      } else {
        setPostType(postType);
      }
      setTitle(sessionStorage.getItem('title') || '');
      setCategory(sessionStorage.getItem('category') || '');
      setContent(sessionStorage.getItem('content') || '');
      setImageURL(sessionStorage.getItem('imageURL') || '');
      setVideoURL(sessionStorage.getItem('videoURL') || '');
    }

    function triggerLeavePageDialog(event: BeforeUnloadEvent) {
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

  return {
    postType,
    setPostType,
    title,
    setTitle,
    category,
    setCategory,
    content,
    setContent,
    imageURL,
    setImageURL,
    imageFile,
    setImageFile,
    videoURL,
    setVideoURL,
  };
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
export const useThemeValue = (
  setTheme: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    const localStorageValue = localStorage.getItem('theme');
    if (!localStorageValue) {
      localStorage.setItem('theme', 'dark');
      return setTheme('dark');
    }
    setTheme(localStorageValue);
  }, []);
};

// Pass the error to the parent component so that the entire page throws an error
// Ensure that the fetch of a resource and the fetch of posts are in sync
export const useSyncWithParent = (
  error: string | null,
  loading: boolean,
  setResourceError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>,
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
export const useSortPosts = (
  posts: Post[] | null,
  setPosts: Updater<Post[] | null>,
) => {
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const localStorageValue = localStorage.getItem('sortBy');
    if (
      localStorageValue &&
      (localStorageValue === 'newest' ||
        localStorageValue === 'oldest' ||
        localStorageValue === 'likes' ||
        localStorageValue === 'comments')
    ) {
      return localStorageValue;
    }
    return 'newest';
  });

  useEffect(() => {
    if (posts) {
      switch (sortBy) {
        case 'newest':
          // Pass a new array to the setter function to ensure rerender
          setPosts(
            posts.toSorted(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            ),
          );
          break;
        case 'oldest':
          setPosts(
            posts.toSorted(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime(),
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
    // Prevent an error if posts are yet to be fetched
    // Ensure that the sorting method is applied when infinite scrolling
  }, [sortBy, posts?.length]);

  return { sortBy, setSortBy };
};

// Change app title
export const useChangeTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = `Aurora - ${title}`;
  }, [title]);
};
