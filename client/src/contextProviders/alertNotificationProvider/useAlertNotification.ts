import React, { createContext, useContext } from 'react';

export interface AlertNotificationState {
  message: string | null | undefined;
  severity?: 'success' | 'info' | 'warning' | 'error';
  open: boolean;
};

export interface AlertNotificationAction {
  type: 'success' | 'info' | 'warning' | 'error' | 'close';
  message?: string;
}

interface AlertNotificationContextValue {
  state: AlertNotificationState;
  dispatch: React.Dispatch<AlertNotificationAction>;
};

export const AlertNotificationContext = createContext<AlertNotificationContextValue | undefined>(undefined);

const useAlertNotification = () => {
  const alertNotificationContext = useContext(AlertNotificationContext);

  if (alertNotificationContext === undefined) {
    throw new Error('AlertNotificationContext.Provider component is not defined');
  }

  return alertNotificationContext;
};

export default useAlertNotification;
