import React, { useState } from 'react';
import styles from './_header.module.scss';
import { Link } from 'react-router-dom';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { GiAtom } from 'react-icons/gi';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.headerTop}>
          <ul className={styles.authBtnsBox}>
            <li>
              <Link to='/signup' className={styles.authBtn}>
                Sign Up
              </Link>
            </li>
            <span className={styles.pipe}>|</span>
            <li>
              <Link to='/login' className={styles.authBtn}>
                Login
              </Link>
            </li>
          </ul>
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
