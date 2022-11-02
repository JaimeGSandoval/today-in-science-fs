import React from 'react';
import styles from './_mobileNav.module.scss';

export const MobileNavBtn = ({ setFn }) => {
  return (
    <button
      className={styles.navMenuBtn}
      onClick={() => setFn(true)}
      aria-controls='navbarModal'
      aria-label='Toggle navigation'
    >
      <span className={styles.navBtnBox}>
        <span className={styles.navIconBar}></span>
        <span className={styles.navIconBar}></span>
        <span className={styles.navIconBar}></span>
      </span>
    </button>
  );
};
