import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from '../NavLink';
import { UserLogo } from '../UserLogo';
import styles from './_mobileNav.module.scss';

const AUTH_LINKS = [
  {
    route: '/signup',
    text: 'Sign up',
  },
  {
    route: '/login',
    text: 'Login',
  },
];

const ARTICLE_VIEW_LINKS = [
  {
    route: '/',
    text: 'Home',
  },
  {
    route: '/dashboard',
    text: 'Dashboard',
  },
  {
    route: '/articles/favorite-articles',
    text: 'Favorite Articles',
  },
  {
    route: '/articles/read-later-articles',
    text: 'Read Later Articles',
  },
  {
    route: '/login',
    text: 'Logout',
  },
];

export const MobileNavMenu = ({ isOpen, setIsOpen }) => {
  const currentUser = localStorage.getItem('currentUser');

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
            {!currentUser &&
              AUTH_LINKS.map((linkData) => (
                <NavLink
                  styles={styles.navLink}
                  linkData={linkData}
                  setIsOpen={setIsOpen}
                  key={linkData.text}
                />
              ))}
            {currentUser &&
              ARTICLE_VIEW_LINKS.map((linkData) => (
                <NavLink
                  styles={styles.navLink}
                  linkData={linkData}
                  setIsOpen={setIsOpen}
                  key={linkData.text}
                />
              ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById('mobile-nav-modal')
  );
};
