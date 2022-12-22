import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import { UserLogo } from '../UserLogo';
import styles from './_mobileNav.module.scss';

const AuthLinks = ({ setIsOpen }) => {
  return (
    <>
      <li>
        <Link to='/signup' className={styles.navLink} onClick={() => setIsOpen(false)}>
          Sign up
        </Link>
      </li>
      <li>
        <Link to='/login' className={styles.navLink} onClick={() => setIsOpen(false)}>
          Login
        </Link>
      </li>
    </>
  );
};

export const MobileNavMenu = ({ isOpen, setIsOpen }) => {
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  return createPortal(
    <div id='navbarModal' className={`${styles.modalContainer} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          {currentUser && <UserLogo styles={styles} />}
          <div className={styles.mobileClose} onClick={() => setIsOpen(false)}>
            &#x2715;
          </div>
        </header>
        <Link to='/' className={styles.logo}>
          today in science
        </Link>
        <nav className={styles.mobileNav}>
          <ul className={styles.subjectsList}>
            {!currentUser && <AuthLinks setIsOpen={setIsOpen} />}
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById('mobile-nav-modal')
  );
};
