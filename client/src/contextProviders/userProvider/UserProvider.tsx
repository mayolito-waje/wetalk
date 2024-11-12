import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { UserContext } from './useUser';
import type { User } from './useUser';

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }} >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
