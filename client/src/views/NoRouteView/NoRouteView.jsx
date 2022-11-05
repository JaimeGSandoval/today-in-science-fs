import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLogo } from '../../components/HeaderLogo';
import styles from './_noView.module.scss';

export const NoRouteView = () => {
  return (
    <>
      <HeaderLogo />
      <div className={styles.container}>
        <h1 className={styles.header}>
          404 - You've entered deep space. There is no content here.
        </h1>
        <Link to='/' className={styles.link}>
          Go back to home page
        </Link>
      </div>
    </>
  );
};
