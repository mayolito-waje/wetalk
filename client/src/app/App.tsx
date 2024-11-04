import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import LandingPage from '../pages/landingPage/LandingPage';
import { AppLoaderData } from './App.loaders';

const App = () => {
  const loader: AppLoaderData = useLoaderData() as AppLoaderData;
  const { accessToken, setAccessToken } = useAccessToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null && loader.accessToken !== null) {
      setAccessToken(loader.accessToken);
      navigate('/chat');
    }
  });

  return (
    <>
      {
        accessToken === null
          ? <LandingPage />
          : <Outlet />
      }
    </>
  );
};

export default App;
