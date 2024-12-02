import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import styles from './Auth.module.css';
import AlertNotification from '../../components/alertNotification/AlertNotification';
import useAccessToken from '../../contextProviders/accessTokenProvider/useAccessToken';
import useAlertNotification from '../../contextProviders/alertNotificationProvider/useAlertNotification';
import useAuth from '../../apiServices/useAuth';

const Auth = () => {
  const [renderPage, setRenderPage] = useState(false);

  const { refreshAccessToken } = useAuth();
  const { accessToken } = useAccessToken();
  const notification = useAlertNotification();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!accessToken && !renderPage) {
        const refreshSuccessful = await refreshAccessToken();
            
        if (refreshSuccessful) {
          notification.dispatch({ type: 'success', message: 'Logged in' });
          navigate('/chat');
        }
      }

      setRenderPage(true);
    })();
  });

  return (
    renderPage && (
      <div className={styles.container}>
        <div className={styles.outlet}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}></div>
            <h2>Connect with everyone, everywhere.</h2>
          </div>
          <Outlet />
        </div>
        <Footer />
        <AlertNotification />
      </div>
    )
  );
};

export default Auth;
