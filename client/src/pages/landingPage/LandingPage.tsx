import { Form, Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import StyledButton from '../../components/styledButton/StyledButton';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.landingContainer}>
        <div className={styles.loginSection}>
          <div className={styles.message}>
            <h2>A fun place to connect with people</h2>
            <p>Deepen your friendships, connect with people, and make more friends.</p>
          </div>
          <Form className={styles.login} method="post">
            <div className={styles.email}>
              <input type="email" name="email" id="landing_email" placeholder='Email address' />
            </div>
            <div className={styles.password}>
              <input type="password" name="password" id="landing_password" placeholder='Password' />
            </div>
            <div>
              <StyledButton text="login" backgroundColor="var(--auth-button-color)" type="submit" />
            </div>
            <div>
              <Link to={'/register'}>No account? Sign up here.</Link>
            </div>
          </Form>
        </div>
        <div className={styles.landingMainPicture}>
          <img src="/cat_pic.jpg" alt="wetalk main picture" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
