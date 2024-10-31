import { useLocation, matchPath, Link } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Footer from './components/footer/Footer';
import StyledButton from './components/styledButton/StyledButton';
import styles from './App.module.css';

const App = () => {
  const { pathname } = useLocation();
  const isAuthPath: boolean = matchPath('/login', pathname) !== null || matchPath('/register', pathname) !== null;

  const renderLandingPage = (): JSX.Element => {
    return (
      <div className={styles.app}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.landingContainer}>
          <div className={styles.loginSection}>
            <div className={styles.message}>
              <h2>A fun place to connect with people</h2>
              <p>Deepen your friendships, connect with people, and make more friends.</p>
            </div>
            <form className={styles.login}>
              <div className={styles.email}>
                <input type="email" name="email" id="landing_email" placeholder='Email address' />
              </div>
              <div className={styles.password}>
                <input type="password" name="password" id="landing_password" placeholder='Password' />
              </div>
              <div>
                <StyledButton text="login" backgroundColor="var(--auth-button-color)" />
              </div>
              <div>
                <Link to={'/register'}>No account? Sign up here.</Link>
              </div>
            </form>
          </div>
          <div className={styles.landingMainPicture}>
            <img src="/cat_pic.jpg" alt="wetalk main picture" />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <>
      {
        isAuthPath
          ? <Auth />
          : renderLandingPage()
      }
    </>
  );
};

export default App;
