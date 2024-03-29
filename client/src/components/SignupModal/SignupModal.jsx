import React from 'react';
import { Link } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { createPortal } from 'react-dom';
import styles from './_signupModal.module.scss';

export const SignupModal = ({ isOpen, setIsOpen }) => {
  const handleClose = async (e) => {
    if (
      e.target.attributes.getNamedItem('data-inner') ||
      e.target.attributes.getNamedItem('data-text') ||
      e.target.attributes.getNamedItem('data-infoBox')
    )
      return;

    setIsOpen(false);
  };

  const closeStyle = {
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  };

  return createPortal(
    <>
      {isOpen && (
        <div className={styles.container} onClick={handleClose}>
          <div className={styles.innerContainer} data-inner={'inner'}>
            <div className={styles.closeBox}>
              <RiCloseFill style={closeStyle}></RiCloseFill>
            </div>
            <div className={styles.infoBox} data-infobox={'infoBox'}>
              <span className={styles.text} data-inner={'text'}>
                You must be logged in to add an article to a favorites or read later list. Would you
                like to{' '}
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
