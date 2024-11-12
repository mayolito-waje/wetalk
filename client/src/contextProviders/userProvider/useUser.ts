import React, { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  profilePicture: null | string;
  createdAt: string;
  isActive: boolean;
};

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);

const useUser = () => {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error('UserContext.Provider component is not defined');
  }

  return user;
};

export default useUser;
