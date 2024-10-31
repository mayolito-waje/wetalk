import { Link } from 'react-router-dom';
import StyledButton from '../../components/styledButton/StyledButton';
import styles from './Auth.module.css';

const Register = () => {
  return (
  <>
    <form className={styles.form} action="">
      <div className={styles.inputWrapper}>
        <input type="email" name="email" id="email" placeholder="email" className={styles.input} />
      </div>
      <div className={styles.inputWrapper}>
        <input type="text" name="username" id="username" placeholder="username" className={styles.input} />
      </div>
      <div className={styles.inputWrapper}>
        <input type="password" name="password" id="password" placeholder="password" className={styles.input} />
      </div>
      <div className={styles.inputWrapper}>
        <input type="password" name="confirm-password" id="confirm-password" placeholder="confirm password" className={styles.input} />
      </div>
      <div>
        <StyledButton text='Sign up' backgroundColor='var(--auth-button-color)' />
      </div>
      <div>
        <Link to={'/login'}>Have an account? Log in here.</Link>
      </div>
    </form>
  </>
  );
};

export default Register;
