import React from 'react';
import { HeaderLogo } from '../../components/HeaderLogo';
import { Profile } from '../../components/Profile/Profile';
import styles from './_dashboard.module.scss';

export const Dashboard = () => {
  return (
    <>
      <HeaderLogo styles={styles} />
      <Profile />
    </>
  );
};
