import axios from 'axios';
import { redirect } from 'react-router-dom';
import type { UserLogin } from '../apiServices/useAuth';

type loginFunc = (credentials: UserLogin) => Promise<boolean>;

export const appAction = ({ login }: { login: loginFunc; }) => async ({ request }: { request: Request; }) => {
  const formData = await request.formData();

  const credentials: UserLogin = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const loginSuccessful = await login(credentials);

  if (loginSuccessful) {
    return redirect('/chat');
  } else {
    return redirect('/');
  }
};

export interface AppLoaderData {
  accessToken: string | null;
};

export const appLoader = async (): Promise<AppLoaderData> => {
  let accessToken: string | null;

  try {
    const res = await axios.get('/api/refresh');
    const data = res.data;
    accessToken = data.accessToken;
  } catch {
    accessToken = null;
  }

  return { accessToken };
};


