import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import NavLink from '../NavLink';
import { UserLogo } from '../UserLogo';
import { AuthBtnsBox } from '../AuthBtnsBox';
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
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  return createPortal(
    <div id='navbarModal' className={`${styles.modalContainer} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          {!currentUser && <AuthBtnsBox styles={styles} setIsOpen={setIsOpen} />}
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
