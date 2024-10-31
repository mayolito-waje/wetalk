import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import App from './App.tsx';
import ErrorHandler from './components/errorHandler/ErrorHandler';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
