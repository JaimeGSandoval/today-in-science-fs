import { useState, createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userLocalStorage = localStorage.getItem('currentUser');
  console.log(userLocalStorage);

  const [currentUser, setCurrentUser] = useState(
    userLocalStorage ? JSON.parse(userLocalStorage) : null
  );

  const userControls = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={userControls}>{children}</UserContext.Provider>;
};
