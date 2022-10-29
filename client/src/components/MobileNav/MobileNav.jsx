import React from 'react';
import { createPortal } from 'react-dom';
import styles from './_mobile-nav.module.scss';

const MobileNav = ({ isOpen, setIsOpen }) => {
  const SUBJECTS = [
    'Archaeology',
    'Artificial Intelligence',
    'Asteroids',
    'Astrobiology',
    'Big Bang',
    'Nano Physics',
    'Robotics',
    'Space Exploration',
    'Stars',
    'Quantum Computers',
    'Quantum Physics',
  ];

  return createPortal(
    <div className={`${styles.modalContainer} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.innerContainer}>
        <div className={styles.mobileClose} onClick={() => setIsOpen(false)}>
          &#x2715;
        </div>
        <span className={styles.logo}>today in science</span>
        <nav className={styles.mobileNav}>
          <ul className={styles.subjectsList}>
            {SUBJECTS.map((subject) => (
              <li key={subject}>
                <a href='/' className={styles.navItem}>
                  {subject}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById('mobile-nav-modal')
  );
};

export default MobileNav;
