import React from 'react';
import styles from './_header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
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
            <a href='/' className={styles.logoText}>
              TODAY IN SCIENCE
            </a>
          </div>

          <a href='/' className={styles.navBtn}>
            <span className={styles.navBtnBox}>
              <span className={styles.navIconBar}></span>
              <span className={styles.navIconBar}></span>
              <span className={styles.navIconBar}></span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
