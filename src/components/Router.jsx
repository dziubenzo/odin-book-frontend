import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AllPostsPage from '../pages/AllPostsPage';
import ErrorPage from '../pages/ErrorPage';
import WelcomePage from '../pages/WelcomePage';
import PostDetailsPage from '../pages/PostDetailsPage';

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
          element: <AllPostsPage />,
        },
        {
          path: ':slug',
          element: <PostDetailsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
