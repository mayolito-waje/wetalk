import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from './apiServices/useAuth';
import App from './app/App';
import ErrorHandler from './components/errorHandler/ErrorHandler';
import Auth from './pages/auth/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/chat/Chat';

import { appAction } from './app/App.loaders';

const RouterWrapper = () => {
  const { login } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorHandler />,
      action: appAction({ login }),
      children: [
        {
          errorElement: <ErrorHandler />,
          children: [
            {
              path: 'chat',
              element: <Chat />,
            },
          ],
        },
      ],
    },
    {
      element: <Auth />,
      errorElement: <ErrorHandler />,
      children: [
        {
          errorElement: <ErrorHandler />,
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default RouterWrapper;
