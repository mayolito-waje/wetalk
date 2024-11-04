import { useEffect } from 'react';
import { Outlet, useLocation, matchPath, useLoaderData, useNavigate } from 'react-router-dom';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import LandingPage from '../pages/landingPage/LandingPage';
import Auth from '../pages/auth/Auth';
import { AppLoaderData } from './App.loaders';

const App = () => {
  const loader: AppLoaderData = useLoaderData() as AppLoaderData;
  const { accessToken, setAccessToken } = useAccessToken();

  const { pathname } = useLocation();
  const isAuthPath: boolean = matchPath('/login', pathname) !== null || matchPath('/register', pathname) !== null;

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null && loader.accessToken !== null) {
      setAccessToken(loader.accessToken);
      navigate('/chat');
    }
  });

  const AuthenticationPage = () => {
    return (
      <>
        {
          isAuthPath
            ? <Auth />
            : <LandingPage />
        }
      </>
    );
  };

  return (
    <>
      {
        accessToken === null
          ? <AuthenticationPage />
          : <Outlet />
      }
    </>
  );
};

export default App;
