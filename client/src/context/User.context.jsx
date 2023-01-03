import { useState, createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userLocalStorage = localStorage.getItem('currentUser');

  const [currentUser, setCurrentUser] = useState(
    userLocalStorage ? JSON.parse(userLocalStorage) : null
  );
  console.log(currentUser);

  const userControls = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={userControls}>{children}</UserContext.Provider>;
};
