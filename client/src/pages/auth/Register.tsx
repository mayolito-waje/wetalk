import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../../components/styledButton/StyledButton';
import styles from './Auth.module.css';
import useAuth, { UserRegister } from '../../apiServices/useAuth';
import useAlertNotification from '../../contextProviders/alertNotificationProvider/useAlertNotification';

const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const notification = useAlertNotification();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSpinner(true);

    if (password !== confirmPassword) {
      notification.dispatch({ type: 'warning', message: 'password and confirm password not match' });
      setSpinner(false);

      return;
    }

    const credentials: UserRegister = { email, username, password };
    const registrationSuccessful = await register(credentials);

    if (registrationSuccessful) {
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
          placeholder="email" 
          className={styles.input}
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }}
      />
      </div>
      <div className={styles.inputWrapper}>
        <input 
          type="text" 
          name="username" 
          id="username" 
          placeholder="username" 
          className={styles.input} 
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setUsername(event.target.value); }}
      />
      </div>
      <div className={styles.inputWrapper}>
        <input 
          type={ showPassword ? 'text' : 'password' }
          name="password" 
          id="password" 
          placeholder="password" 
          className={styles.input}
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }}
      />
      </div>
      <div className={styles.inputWrapper}>
        <input 
          type={ showPassword ? 'text' : 'password' }
          name="confirm-password" 
          id="confirm-password" 
          placeholder="confirm password" 
          className={styles.input} 
          value={confirmPassword}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(event.target.value); }}
      />
      </div>
      <div>
        <input type="checkbox" name="show_password" id="show_password" checked={showPassword} onChange={() => { setShowPassword(!showPassword); }} />
        <label htmlFor="show_password"> show password</label>
      </div>
      <div>
        <StyledButton type='submit' text='Sign up' backgroundColor='var(--auth-button-color)' spinner={spinner} />
      </div>
      <div>
        <Link to={'/login'}>Have an account? Log in here.</Link>
      </div>
    </form>
  </>
  );
};

export default Register;
