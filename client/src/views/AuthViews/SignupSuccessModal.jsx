import React from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './_signupSuccess.module.scss';

export const SignupSuccessModal = () => {
  return createPortal(
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.infoBox}>
          <span className={styles.text}>
            You have successfully signed up! Would you like to{' '}
            <Link className={styles.link} to='/login'>
              login
            </Link>
            ?
          </span>
        </div>
      </div>
    </div>,
    document.getElementById('signup-success-modal')
  );
};
