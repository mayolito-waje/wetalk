import axios, { AxiosError } from 'axios';
import useAccessToken from '../contextProviders/accessTokenProvider/useAccessToken';
import useAlertNotification from '../contextProviders/alertNotificationProvider/useAlertNotification';

const useUsers = () => {
  const { accessToken } = useAccessToken();
  const { dispatch: notificationDispatch } = useAlertNotification();

  const getLoggedInUser = async () => {
    try {
      const res = await axios.get('/api/users/@me', {
        headers: {
          Authorization: 'bearer ' + accessToken,
        },
      });

      return res.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notificationDispatch({ type: 'error', message: error.response?.data.error });
      }
    }
  };

  return { getLoggedInUser };
};

export default useUsers;
