import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './ErrorHandler.module.css';

const ErrorHandler = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.error}>
        <div className={styles.errorHeader}>
          <ErrorOutlineIcon sx={{ fontSize: 35 }} />
          <h1>Error</h1>
        </div>
        <h2><em>{error.status}</em></h2>
        <p><em>{error.statusText}</em></p>
      </div>
    );
  } else {
    return (
      <div className={styles.error}>Error</div>
    );
  }
};

export default ErrorHandler;
