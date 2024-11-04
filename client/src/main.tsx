import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import AccessTokenProvider from './contextProviders/accessTokenProvider/AccessTokenProvider';
import RouterWrapper from './RouterWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessTokenProvider>
      <RouterWrapper />
    </AccessTokenProvider>
  </StrictMode>,
);
