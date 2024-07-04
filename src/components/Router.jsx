import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import PostsPage from '../pages/PostsPage';
import ErrorPage from '../pages/ErrorPage';
import WelcomePage from '../pages/WelcomePage';
import PostDetailsPage from '../pages/PostDetailsPage';
import ProfilePage from '../pages/ProfilePage';
import AllCategoriesPage from '../pages/AllCategoriesPage';
import NewCategoryPage from '../pages/NewCategoryPage';
import AllUsersPage from '../pages/AllUsersPage';
import UserPage from '../pages/UserPage';
import NewPostPage from '../pages/NewPostPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage />,
      errorElement: <ErrorPage />,
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
          element: <PostsPage />,
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
          element: <UserPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
