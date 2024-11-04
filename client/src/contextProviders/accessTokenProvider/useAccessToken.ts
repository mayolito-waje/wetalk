import React, { createContext, useContext } from 'react';

interface AccessTokenContextValue {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AccessTokenContext = createContext<AccessTokenContextValue | undefined>(undefined);

const useAccessToken = () => {
  const accessTokenContext = useContext(AccessTokenContext);

  if (accessTokenContext === undefined) {
    throw new Error('AccessTokenContext.Provider component is not defined');
  }

  return accessTokenContext;
};

export default useAccessToken;
