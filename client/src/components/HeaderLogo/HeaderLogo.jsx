import React, { useState } from 'react';
import styles from './_headerLogo.module.scss';
import { Link } from 'react-router-dom';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { GiAtom } from 'react-icons/gi';

export const HeaderLogo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.logoBox}>
            <GiAtom className={styles.logoIcon} />
            <Link to='/' className={styles.logoText}>
              TODAY IN SCIENCE
            </Link>
          </div>
          <MobileNavBtn setFn={setIsOpen} />
        </div>
      </div>
      <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
