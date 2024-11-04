import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from './apiServices/useAuth';
import App from './app/App';
import ErrorHandler from './components/errorHandler/ErrorHandler';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/chat/Chat';

import { appAction, appLoader } from './app/App.loaders';

const RouterWrapper = () => {
  const { login } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorHandler />,
      loader: appLoader,
      action: appAction({ login }),
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
            {
              path: 'chat',
              element: <Chat />,
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
