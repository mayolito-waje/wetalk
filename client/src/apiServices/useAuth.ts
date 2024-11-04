import axios from 'axios';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';

export interface UserLogin {
  email: string;
  password: string;
};

const useAuth = () => {
  const { setAccessToken } = useAccessToken();

  const login = async (credentials: UserLogin) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      const loggedUser = res.data;

      const { accessToken } = loggedUser;
      setAccessToken(accessToken as string);

      return true;
    } catch(error: unknown) {
      if (error instanceof Error) {
        console.error(error);
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
    } catch(error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return { login, refreshAccessToken };
};

export default useAuth;
