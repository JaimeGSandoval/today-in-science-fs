import React from 'react';
import { Link } from 'react-router-dom';
import blankImg from '../assets/images/jpg/blank-profile.png';

export const UserLogo = ({ styles }) => {
  return (
    <div className={styles.userLogoBox}>
      <div className={styles.imgBox}>
        <Link to='/dashboard'>
          <img src={blankImg} className={styles.blankImg} alt='' />
        </Link>
      </div>

      <span className={styles.username}>HokageDev</span>
    </div>
  );
};
