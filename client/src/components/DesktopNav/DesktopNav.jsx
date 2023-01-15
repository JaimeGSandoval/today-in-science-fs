import React from 'react';
import { Link } from 'react-router-dom';
import styles from './_desktopNav.module.scss';

const UserLoggedOut = () => {
  return (
    <>
      <li className={styles.navItem}>
        <Link to='/' className={styles.navLink}>
          Home
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to='/signup' className={styles.navLink}>
          Sign up
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to='/login' className={styles.navLink}>
          Log in
        </Link>
      </li>
    </>
  );
};

const UserLoggedIn = () => {
  return (
    <>
      <li className={styles.navItem}>
        <Link to='/' className={styles.navLink}>
          Home
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to='/dashboard' className={styles.navLink}>
          Dashboard
        </Link>
      </li>
    </>
  );
};

export const DesktopNav = () => {
  const currentUser = localStorage.getItem('currentUser');

  return (
    <nav className={styles.desktopNav}>
      <ul className={styles.navList}>
        {!currentUser && <UserLoggedOut />}
        {currentUser && <UserLoggedIn />}
      </ul>
    </nav>
  );
};
