import React, { useState, useContext } from 'react';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { UserContext } from '../../context/User.context';
import { UserLogo } from '../UserLogo';
import styles from './_headerLogo.module.scss';

export const HeaderLogo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.logoBox}>{currentUser && <UserLogo styles={styles} />}</div>
            <MobileNavBtn setFn={setIsOpen} />
          </div>
        </div>
        <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    </>
  );
};
