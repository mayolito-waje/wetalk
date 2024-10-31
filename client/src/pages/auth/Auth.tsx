import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import styles from './Auth.module.css';

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.outlet}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}></div>
          <h2>Connect with everyone, everywhere.</h2>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
