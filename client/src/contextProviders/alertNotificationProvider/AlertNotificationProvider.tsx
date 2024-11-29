import { useReducer } from 'react';
import type { PropsWithChildren } from 'react';
import { AlertNotificationContext } from './useAlertNotification';
import type { AlertNotificationState, AlertNotificationAction } from './useAlertNotification';

const reducer = (state: AlertNotificationState, action: AlertNotificationAction): AlertNotificationState => {
  switch(action.type) {
    case 'success':
    case 'info':
    case 'error':
    case 'warning': {
      return {
        message: action.message,
        severity: action.type,
        open: true,
      };
    }
    case 'close': {
      return {
        ...state,
        message: null,
        open: false,
      };
    }
  }
};

const AlertNotificationProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, { message: null, open: false });

  return (
    <AlertNotificationContext.Provider value={{ state, dispatch }}>
      { children }
    </AlertNotificationContext.Provider>
  );
};

export default AlertNotificationProvider;
