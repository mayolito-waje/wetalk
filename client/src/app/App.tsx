import { Outlet,  useNavigate } from 'react-router-dom';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import useAuth from '../apiServices/useAuth';
import LandingPage from '../pages/landingPage/LandingPage';

const App = () => {
  const { accessToken } = useAccessToken();
  const { refreshAccessToken } = useAuth();

  const navigate = useNavigate();

  (async () => {
    if (accessToken === null) {
      const refreshSuccessful = await refreshAccessToken();
        
      if (refreshSuccessful) {
        navigate('/chat');
      }
    }
  })();

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
