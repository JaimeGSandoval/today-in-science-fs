import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiAtom } from 'react-icons/gi';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { DesktopNav } from '../DesktopNav';
import { UserLogo } from '../UserLogo';
import styles from './_header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = localStorage.getItem('currentUser');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {currentUser && (
          <div className={`${styles.headerTop} ${currentUser && styles.bottomBorder}`}>
            <UserLogo styles={styles} />
          </div>
        )}

        <div className={`${styles.headerBottom} ${!currentUser && styles.bottomBorder}`}>
          <div className={styles.logoBox}>
            <GiAtom className={styles.logoIcon} />
            <Link to='/' className={styles.logoText}>
              TODAY IN SCIENCE
            </Link>
          </div>
          <MobileNavBtn setFn={setIsOpen} styles={styles} />
          <DesktopNav />
        </div>
      </div>
      <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
