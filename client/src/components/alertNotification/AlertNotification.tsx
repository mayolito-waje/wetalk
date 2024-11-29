import React from 'react';
import { Snackbar, SnackbarCloseReason, Alert } from '@mui/material';
import useAlertNotification from '../../contextProviders/alertNotificationProvider/useAlertNotification';

const AlertNotification = () => {
  const { state, dispatch } = useAlertNotification();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'close' });
  };

  return (
    <Snackbar open={state.open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}>
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
