import axios, { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import useAlertNotification from '../contextProviders/alertNotificationProvider/useAlertNotification';

export interface UserLogin {
  email: string;
  password: string;
};

export interface UserRegister {
  email: string;
  username: string;
  password: string;
  profilePicture?: string;
}

const useAuth = () => {
  const { dispatch: notificationDispatch } = useAlertNotification();
  const { accessToken, setAccessToken } = useAccessToken();

  const login = async (credentials: UserLogin) => {
    try {
      const res = await axios({
        url: '/api/auth/login',
        method: 'post',
        data: credentials,
      });

      const loggedUser = res.data;
      const { accessToken, message } = loggedUser;

      setAccessToken(accessToken as string);
      notificationDispatch({ type: 'success', message });

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
      const res = await axios({
        url: '/api/auth/logout',
        method: 'post',
        headers: { Authorization: 'Bearer ' + accessToken },
      });

      notificationDispatch({ type: 'success', message: res.data.message });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }
    }
  };

  const register = async (credentials: UserRegister) => {
    try {
      const res = await axios({
        url: '/api/auth/register',
        method: 'post',
        data: credentials,
      });

      const registeredUser = res.data;
      const { accessToken, message } = registeredUser;

      setAccessToken(accessToken as string);
      notificationDispatch({ type: 'success', message });

      return true;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }

      return false;
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
        const errorName = error.response?.data.errorName;

        if (errorName === 'TokenExpiredError') {
          notificationDispatch({ type: 'error', message: 'Token expired. please re-login.' });
        }
      }

      redirect('/');

      return false;
    }
  };

  return { login, logout, register, refreshAccessToken };
};

export default useAuth;
