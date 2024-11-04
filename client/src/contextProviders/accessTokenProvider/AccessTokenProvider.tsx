import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { AccessTokenContext } from './useAccessToken';

const AccessTokenProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      { children }
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;
