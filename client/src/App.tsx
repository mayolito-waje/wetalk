import StyledButton from './components/styledButton/StyledButton';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}><div className={styles.logoText}>wetalk</div></div>
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
            <StyledButton text="login" backgroundColor="var(--auth-button-color)" />
            {/* <input type="checkbox" name="keep_signed_in" id="landing_keep_signed_in" />
            <label htmlFor="landing_keep_signed_in">Keep me signed in</label> */}
          </form>
        </div>
        <div className={styles.landingMainPicture}>
          <img src="/cat_pic.jpg" alt="wetalk main picture" />
        </div>
      </div>
      <footer>© Mayolito Waje, 2024</footer>
    </div>
  );
};

export default App;
