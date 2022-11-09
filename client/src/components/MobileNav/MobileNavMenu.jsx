import React from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import NavLink from '../NavLink';
import styles from './_mobileNav.module.scss';

const SUBJECTS = [
  'artificial-intelligence',
  'ancient-civilizations',
  'astronomy',
  'big-bang',
  'energy-technology',
  'mathematics',
  'neural-interfaces',
  'neuroscience',
  'quantum-computers',
];

export const MobileNavMenu = ({ isOpen, setIsOpen }) => {
  return createPortal(
    <div id='navbarModal' className={`${styles.modalContainer} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <ul className={styles.authBtnsBox}>
            <li>
              <Link to='/signup' className={styles.authBtn} onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </li>
            <span className={styles.pipe}>|</span>
            <li>
              <Link to='/login' className={styles.authBtn} onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
          <div className={styles.mobileClose} onClick={() => setIsOpen(false)}>
            &#x2715;
          </div>
        </header>
        <Link to='/' className={styles.logo}>
          today in science
        </Link>
        <nav className={styles.mobileNav}>
          <ul className={styles.subjectsList}>
            {SUBJECTS.map((subject) => (
              <NavLink
                subject={subject}
                styles={styles.navLink}
                key={subject}
                setIsOpen={setIsOpen}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById('mobile-nav-modal')
  );
};
