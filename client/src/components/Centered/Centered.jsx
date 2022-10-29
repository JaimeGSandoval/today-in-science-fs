import React from 'react';
import styles from './_centered.module.scss';

const Centered = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Centered;
