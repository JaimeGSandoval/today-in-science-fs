import React from 'react';
import NavLink from '../NavLink';
import styles from './_footer.module.scss';

const SUBJECTS_ONE = [
  'Artificial Intelligence',
  'Ancient Civilizations',
  'Astronomy',
  'Big Bang',
  'Energy Technology',
];

const SUBJECTS_TWO = ['Mathematics', 'Neural Interfaces', 'Neuroscience', 'Quantum Computers'];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.headline}>Categories</h1>
        <nav className={styles.nav}>
          <div className={styles.linkBox}>
            <ul>
              {SUBJECTS_ONE.map((subject) => (
                <NavLink subject={subject} styles={styles.navLink} key={subject} />
              ))}
            </ul>
          </div>

          <div className={styles.linkBox}>
            <ul>
              {SUBJECTS_TWO.map((subject) => (
                <NavLink subject={subject} styles={styles.navLink} key={subject} />
              ))}
            </ul>
          </div>
        </nav>

        <div className={styles.logoBox}>
          <span className={styles.logo}>TODAY IN SCIENCE</span>
        </div>
      </div>
    </footer>
  );
};
