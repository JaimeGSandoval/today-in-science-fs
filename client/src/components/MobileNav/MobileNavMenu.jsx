import React from 'react';
import { createPortal } from 'react-dom';
import NavLink from '../NavLink';
import styles from './_mobileNav.module.scss';

export const MobileNavMenu = ({ isOpen, setIsOpen }) => {
  const SUBJECTS = [
    'Archaeology',
    'Artificial Intelligence',
    'Asteroids',
    'Astrobiology',
    'Astronomy',
    'Big Bang',
    'Nano Physics',
    'Robotics',
    'Space Exploration',
    'Stars',
    'Quantum Computers',
    'Quantum Physics',
  ];

  return createPortal(
    <div id='navbarModal' className={`${styles.modalContainer} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.innerContainer}>
        <div className={styles.mobileClose} onClick={() => setIsOpen(false)}>
          &#x2715;
        </div>
        <span className={styles.logo}>today in science</span>
        <nav className={styles.mobileNav}>
          <ul className={styles.subjectsList}>
            {SUBJECTS.map((subject) => (
              <NavLink subject={subject} styles={styles.navLink} key={subject} />
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById('mobile-nav-modal')
  );
};
