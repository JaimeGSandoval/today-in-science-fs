import React from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './_signupModal.module.scss';

export const SignupModal = ({ isOpen, setIsOpen }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.innerContainer}>
            <div className={styles.infoBox}>
              <span className={styles.text}>
                You must be logged in to add an article to favorites or read later. Would you like
                to{' '}
                <Link className={styles.link} to='/login'>
                  login
                </Link>{' '}
                in or{' '}
                <Link className={styles.link} to='/signup'>
                  signup
                </Link>
                ?
              </span>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('signup-modal')
  );
};
