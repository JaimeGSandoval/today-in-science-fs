import React, { useContext } from 'react';
import { UserContext } from '../context/User.context';
import { Link } from 'react-router-dom';
import blankImg from '../assets/images/jpg/blank-profile.png';

export const UserLogo = ({ styles }) => {
  const currentUserContext = useContext(UserContext);
  console.log(currentUserContext);
  const { currentUser } = currentUserContext;

  return (
    <div className={styles.userLogoBox}>
      <div className={styles.imgBox}>
        <Link to='/dashboard'>
          <img src={blankImg} className={styles.blankImg} alt='' />
        </Link>
      </div>

      <span className={styles.username}>{currentUser.user_name}</span>
    </div>
  );
};
