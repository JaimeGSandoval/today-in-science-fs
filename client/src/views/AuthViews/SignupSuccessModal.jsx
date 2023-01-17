import React from 'react';
import { Link } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { createPortal } from 'react-dom';
import styles from './_signupSuccess.module.scss';

export const SignupSuccessModal = ({ setSuccessModalOpen }) => {
  const handleClose = async (e) => {
    if (
      e.target.attributes.getNamedItem('data-inner') ||
      e.target.attributes.getNamedItem('data-text')
    )
      return;

    setSuccessModalOpen(false);
  };

  const closeStyle = {
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
  };

  return createPortal(
    <div className={styles.container} onClick={handleClose}>
      <div className={styles.innerContainer} data-inner={'inner'}>
        <div className={styles.closeBox}>
          <RiCloseFill style={closeStyle}></RiCloseFill>
        </div>
        <div className={styles.infoBox}>
          <span className={styles.text} data-text={'text'}>
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
