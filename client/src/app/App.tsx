import { useEffect } from 'react';
import { Outlet,  useNavigate } from 'react-router-dom';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import useAuth from '../apiServices/useAuth';
import LandingPage from '../pages/landingPage/LandingPage';
import AlertNotification from '../components/alertNotification/AlertNotification';
import useAlertNotification from '../contextProviders/alertNotificationProvider/useAlertNotification';

const App = () => {
  const { dispatch: notificationDispatch } = useAlertNotification();
  const { accessToken } = useAccessToken();
  const { refreshAccessToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (accessToken === null) {
        const refreshSuccessful = await refreshAccessToken();
          
        if (refreshSuccessful) {
          notificationDispatch({ type: 'success', message: 'Login Successfull' });
          navigate('/chat');
        }
      }
    })();
  });

  return (
    <div>
      {
        accessToken === null
          ? <LandingPage />
          : <Outlet />
      }
      <AlertNotification />
    </div>
  );
};

export default App;
