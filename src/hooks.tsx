import Cookies from 'js-cookie';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { type Updater, useImmer } from 'use-immer';
import API_URL from './API';
import { SHRINK_HEADER_SCROLL_VALUE } from './constants';
import {
  type OutletContext,
  type Post,
  type PostType,
  type SortBy,
  type ThemeValue,
  type User,
} from './types';

// Authenticate user based on JWT stored in a cookie
// Set user state if auth successful
export const useAuthUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useImmer<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function authUser() {
      try {
        const res = await fetch(`${API_URL}/users/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          return navigate('/');
        }
        const user: User = await res.json();
        setUser(user);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }
    authUser();

    return () => {
      controller.abort();
    };
  }, []);

  return { user, setUser };
};

// Wrapper for the useOutletContext hook to avoid having to type the hook whenever I use it
export const useUserAndTheme = () => {
  const { user, setUser, theme, setTheme } = useOutletContext<OutletContext>();

  return { user, setUser, theme, setTheme };
};

// Check user authentication (Welcome Page)
// Show Welcome Page if auth unsuccessful
// Redirect to /posts if auth successful
export const useCheckAuth = () => {
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/users/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          setShowPage(true);
          return;
        }
        return navigate('/posts');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }
    checkAuth();

    return () => {
      controller.abort();
    };
  }, []);

  return showPage;
};

// Fetch page data
export const useFetchPageData = <T,>(endpoint: string) => {
  const [data, setData] = useImmer<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setData(null);
        setError(null);
        const res = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          const error = (await res.json()) as string;
          setLoading(false);
          return setError(error);
        }
        const data: T = await res.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setError('Unexpected error occurred');
      } finally {
        if (controller.signal.aborted) return;
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
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
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);
        setPosts(null);
        setError(null);
        setHasMore(true);
        const res = await fetch(
          `${API_URL}${endpoint}${
            endpoint[endpoint.length - 1] === '/'
              ? `?limit=${limit}`
              : `&limit=${limit}`
          }`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            signal: controller.signal,
          },
        );
        if (!res.ok) {
          const error = await res.json();
          setLoading(false);
          return setError(error);
        }
        const posts = await res.json();
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setError('Unexpected error occurred');
      } finally {
        if (controller.signal.aborted) return;
        setLoading(false);
      }
    }
    fetchPosts();

    return () => {
      controller.abort();
    };
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

// Save the initial theme value to the local storage
// Otherwise read the theme value from the local storage
export const useThemeValue = (initialValue: ThemeValue) => {
  const [theme, setTheme] = useState<ThemeValue>(initialValue);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('theme');
    if (
      localStorageValue &&
      (localStorageValue === 'light' || localStorageValue === 'dark')
    ) {
      setTheme(localStorageValue);
    } else {
      localStorage.setItem('theme', initialValue);
    }
  }, [initialValue]);

  // Listen for changes to the theme
  // Change the theme in other opened app tabs so that they are in sync
  useEffect(() => {
    const syncTheme = (event: StorageEvent) => {
      if (
        event.key === 'theme' &&
        (event.newValue === 'light' || event.newValue === 'dark')
      ) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener('storage', syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  return { theme, setTheme };
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

  const newest = useMemo(() => {
    if (!posts) return;
    return posts.toSorted(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [posts]);

  const oldest = useMemo(() => {
    if (!posts) return;
    return posts.toSorted(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }, [posts]);

  const likes = useMemo(() => {
    if (!posts) return;
    return posts.toSorted(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }, [posts]);

  const comments = useMemo(() => {
    if (!posts) return;
    return posts.toSorted((a, b) => b.comments.length - a.comments.length);
  }, [posts]);

  // Use useLayoutEffect to prevent content flickering/flashes when changing the sorting method
  useLayoutEffect(() => {
    if (!posts) return;
    switch (sortBy) {
      case 'newest':
        setPosts(newest!);
        break;
      case 'oldest':
        setPosts(oldest!);
        break;
      case 'likes':
        setPosts(likes!);
        break;
      case 'comments':
        setPosts(comments!);
        break;
    }
  }, [sortBy, posts?.length]);

  return { sortBy, setSortBy };
};

// Change app title
export const useChangeTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = `Aurora - ${title}`;
  }, [title]);
};

// Log in the user automatically by simulating a submit button click when they have just signed up
export const useLogInAutomatically = (
  logInAutomatically: boolean,
  submitBtnRef: React.RefObject<HTMLButtonElement | null>,
) => {
  useEffect(() => {
    if (logInAutomatically && submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  }, [logInAutomatically, submitBtnRef]);
};

// Scroll to top whenever the user visits a page
export const useSmoothScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }, [pathname]);
};
