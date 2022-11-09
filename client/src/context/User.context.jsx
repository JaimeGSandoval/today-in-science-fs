import { useState, createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const userControls = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={userControls}>{children}</UserContext.Provider>;
};
