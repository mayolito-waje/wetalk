import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import AccessTokenProvider from './contextProviders/accessTokenProvider/AccessTokenProvider';
import AlertNotificationProvider from './contextProviders/alertNotificationProvider/AlertNotificationProvider';
import UserProvider from './contextProviders/userProvider/UserProvider';
import RouterWrapper from './RouterWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessTokenProvider>
      <AlertNotificationProvider>
        <UserProvider><RouterWrapper /></UserProvider>
      </AlertNotificationProvider>
    </AccessTokenProvider>
  </StrictMode>,
);
