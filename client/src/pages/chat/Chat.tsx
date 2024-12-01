import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../apiServices/useAuth';
import useAccessToken from '../../contextProviders/accessTokenProvider/useAccessToken';
import useAlertNotification from '../../contextProviders/alertNotificationProvider/useAlertNotification';
import useUser from '../../contextProviders/userProvider/useUser';

const Chat = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { accessToken, setAccessToken } = useAccessToken();
  const { dispatch: notificationDispatch } = useAlertNotification();
  const { setUser } = useUser();

  useEffect(() => {
    if (!accessToken) {
      notificationDispatch({ type: 'error', message: 'access token required' });
      navigate('/');
    }
  });

  const handleLogout = async () => {
    await logout();

    setAccessToken(null);
    setUser(null);

    navigate('/');
  };

  return (
    <div>
      Chat
      <button onClick={handleLogout}>logout (temporary)</button>
    </div>
  );
};

export default Chat;
