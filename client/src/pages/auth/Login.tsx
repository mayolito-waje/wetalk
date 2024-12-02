import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../../components/styledButton/StyledButton';
import styles from './Auth.module.css';
import useAuth, { UserLogin } from '../../apiServices/useAuth';

const Login = () => {
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSpinner(true);

    const credentials: UserLogin = { email, password };
    const loginSuccess = await login(credentials);

    if (loginSuccess) {
      navigate('/chat');
    } else {
      setSpinner(false);
    }
  };

  return (
  <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="email address" 
          className={styles.input}
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} />
      </div>
      <div className={styles.inputWrapper}>
        <input 
          type={ showPassword ? 'text' : 'password' } 
          name="password" id="password" 
          placeholder="password" 
          className={styles.input}
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }} />
      </div>
      <div>
        <input type="checkbox" name="show_password" id="show_password" checked={showPassword} onChange={() => { setShowPassword(!showPassword); }} />
        <label htmlFor="show_password"> show password</label>
      </div>
      <div>
        <StyledButton type='submit' text='continue' backgroundColor='var(--auth-button-color)' spinner={spinner} />
      </div>
      <div>
        <Link to={'/register'}>No account? Sign up here.</Link>
      </div>
    </form>
  </>
  );
};

export default Login;
