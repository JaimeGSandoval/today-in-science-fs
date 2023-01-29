import React from 'react';
import spinner from '../assets/images/spinner.png';

export const Spinner = ({ styles }) => {
  return (
    <div className={styles.spinnerBox}>
      <img src={spinner} className={styles.spinnerImg} alt='' />
    </div>
  );
};
