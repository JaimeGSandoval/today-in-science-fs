import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import { Profile } from '../../components/Profile/Profile';

export const DashboardView = () => {
  const currentUserContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  return (
    <>
      {!currentUser && <Navigate to='/login' />}
      <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
  );
};
