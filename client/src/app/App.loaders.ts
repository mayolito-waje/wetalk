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
