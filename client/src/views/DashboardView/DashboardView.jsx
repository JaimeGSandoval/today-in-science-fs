import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import { HeaderLogo } from '../../components/HeaderLogo';
import { Profile } from '../../components/Profile/Profile';

export const DashboardView = () => {
  const currentUserContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  return (
    <>
      {!currentUser && <Navigate to='/login' />}
      <HeaderLogo />
      <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
  );
};
