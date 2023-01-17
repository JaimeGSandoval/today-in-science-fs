import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
// import { HeaderLogo } from '../../components/HeaderLogo';
import { Profile } from '../../components/Profile/Profile';
import { Footer } from '../../components/Footer';

export const DashboardView = () => {
  const currentUserContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  return (
    <>
      {!currentUser && <Navigate to='/login' />}
      <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Footer />
    </>
  );
};
