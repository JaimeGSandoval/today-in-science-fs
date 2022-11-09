import React, { useState, useContext } from 'react';
import { GiAtom } from 'react-icons/gi';
import { UserContext } from '../../context/User.context';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { UserLogo } from '../UserLogo';
import { AuthBtnsBox } from '../AuthBtnsBox';
import styles from './_header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerTop}>
          {!currentUser && <AuthBtnsBox styles={styles} />}
          {currentUser && <UserLogo styles={styles} />}
        </div>

        <div className={styles.headerBottom}>
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
