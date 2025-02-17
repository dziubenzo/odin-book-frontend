import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllCategoriesPage from '../pages/AllCategoriesPage';
import AllUsersPage from '../pages/AllUsersPage';
import ErrorPage from '../pages/ErrorPage';
import NewCategoryPage from '../pages/NewCategoryPage';
import NewPostPage from '../pages/NewPostPage';
import PostDetailsPage from '../pages/PostDetailsPage';
import PostsPage from '../pages/PostsPage';
import ProfilePage from '../pages/ProfilePage';
import WelcomePage from '../pages/WelcomePage';
import App from './App';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage />,
      errorElement: <ErrorPage isWholePage={true} />,
    },
    {
      path: '/posts',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '',
          element: <PostsPage pageDescription="All Posts" />,
        },
        {
          path: 'categories',
          element: (
            <PostsPage
              fetchQuery="?filter=categories"
              pageDescription="Posts By Followed Categories"
            />
          ),
        },
        {
          path: 'following',
          element: (
            <PostsPage
              fetchQuery="?filter=following"
              pageDescription="Posts By Followed Users"
            />
          ),
        },
        {
          path: 'liked',
          element: (
            <PostsPage
              fetchQuery="?filter=liked"
              pageDescription="Posts Liked By You"
            />
          ),
        },
        {
          path: 'by-you',
          element: (
            <PostsPage
              fetchQuery="?filter=yours"
              pageDescription="Your Posts"
            />
          ),
        },
        {
          path: 'create',
          element: <NewPostPage />,
        },
        {
          path: ':slug',
          element: <PostDetailsPage />,
        },
      ],
    },
    {
      path: '/profile',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: '/categories',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '',
          element: <AllCategoriesPage />,
        },
        {
          path: 'new',
          element: <NewCategoryPage />,
        },
        {
          path: ':slug',
          element: (
            <PostsPage
              fetchQuery="?category="
              pageDescription="Category"
              isCategoryPage={true}
            />
          ),
        },
      ],
    },
    {
      path: '/users',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '',
          element: <AllUsersPage />,
        },
        {
          path: ':username',
          element: (
            <PostsPage
              fetchQuery="?user="
              pageDescription="User"
              isUserPage={true}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
