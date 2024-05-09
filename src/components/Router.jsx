import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '/toBeSpecified',
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
