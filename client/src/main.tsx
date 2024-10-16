import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ErrorHandler from './components/errorHandler/ErrorHandler';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorHandler />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
