import React, { useState } from 'react';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { DesktopNav } from '../DesktopNav/DesktopNav';
import { UserLogo } from '../UserLogo';
import styles from './_headerLogo.module.scss';

export const HeaderLogo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = localStorage.getItem('currentUser');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.logoBox}>{currentUser && <UserLogo styles={styles} />}</div>
            <MobileNavBtn setFn={setIsOpen} />
            <DesktopNav />
          </div>
        </div>
        <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    </>
  );
};
