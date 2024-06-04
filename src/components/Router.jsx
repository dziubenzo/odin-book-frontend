import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AllPostsPage from '../pages/AllPostsPage';
import ErrorPage from '../pages/ErrorPage';
import WelcomePage from '../pages/WelcomePage';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
