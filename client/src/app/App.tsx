import { useState, useEffect } from 'react';
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

  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    (async () => {
      if (accessToken === null && !renderPage) {
        const refreshSuccessful = await refreshAccessToken();
          
        if (refreshSuccessful) {
          notificationDispatch({ type: 'success', message: 'Logged in' });
          navigate('/chat');
        }

        setRenderPage(true);
      }
    })();
  });

  return (
    renderPage && (
      <div>
        {
          accessToken === null
            ? <LandingPage />
            : <Outlet />
        }
        <AlertNotification />
      </div>
    )
  );
};

export default App;
