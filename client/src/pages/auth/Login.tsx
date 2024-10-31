import { Link } from 'react-router-dom';
import StyledButton from '../../components/styledButton/StyledButton';
import styles from './Auth.module.css';

const Login = () => {
  return (
  <>
    <form className={styles.form} action="">
      <div className={styles.inputWrapper}>
        <input type="email" name="email" id="email" placeholder="email address" className={styles.input} />
      </div>
      <div className={styles.inputWrapper}>
        <input type="password" name="password" id="password" placeholder="password" className={styles.input} />
      </div>
      <div>
        <StyledButton text='continue' backgroundColor='var(--auth-button-color)' />
      </div>
      <div>
        <Link to={'/register'}>No account? Sign up here.</Link>
      </div>
    </form>
  </>
  );
};

export default Login;
