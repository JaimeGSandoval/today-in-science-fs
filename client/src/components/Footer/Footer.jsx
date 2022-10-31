import React from 'react';
import styles from './_footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.headline}>Categories</h1>
        <nav className={styles.nav}>
          <div className={styles.linkBox}>
            <ul>
              <li>
                <a className={styles.navLink} href='/'>
                  Archaeology
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Artificial Intelligence
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Asteroids
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Astrobiology
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Big Bang
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Nano Physics
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.linkBox}>
            <ul>
              <li>
                <a href='/' className={styles.navLink}>
                  Robotics
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Artificial Intelligence
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Space Exploration
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Stars
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Quantum Computers
                </a>
              </li>
              <li>
                <a href='/' className={styles.navLink}>
                  Quantum Physics
                </a>
              </li>
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
