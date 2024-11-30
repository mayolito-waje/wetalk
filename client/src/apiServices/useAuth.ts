import axios, { AxiosError } from 'axios';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import useAlertNotification from '../contextProviders/alertNotificationProvider/useAlertNotification';

export interface UserLogin {
  email: string;
  password: string;
};

const useAuth = () => {
  const { dispatch: notificationDispatch } = useAlertNotification();
  const { accessToken, setAccessToken } = useAccessToken();

  const login = async (credentials: UserLogin) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      const loggedUser = res.data;

      const { accessToken } = loggedUser;
      setAccessToken(accessToken as string);

      return true;
    } catch(error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }

      return false;
    }
  };

  const logout = async () => {
    try {
      await refreshAccessToken();

      const res = await axios.post('/api/auth/logout', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      notificationDispatch({ type: 'success', message: res.data.message });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get('/api/refresh');
      const data = res.data;

      const { accessToken } = data;
      setAccessToken(accessToken as string);

      return true;
    } catch(error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }

      return false;
    }
  };

  return { login, logout, refreshAccessToken };
};

export default useAuth;
