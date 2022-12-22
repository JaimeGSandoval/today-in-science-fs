import React, { useState, useContext } from 'react';
import { GiAtom } from 'react-icons/gi';
import { UserContext } from '../../context/User.context';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { UserLogo } from '../UserLogo';
import styles from './_header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

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
            <a href='/' className={styles.logoText}>
              TODAY IN SCIENCE
            </a>
          </div>
          <MobileNavBtn setFn={setIsOpen} styles={styles} />
        </div>
      </div>
      <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
