import React from 'react';
import { createPortal } from 'react-dom';
import styles from './_signupModal.module.scss';

export const SignupModal = ({ isOpen, setIsOpen }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className={styles.test}>
          <h1 onClick={() => setIsOpen(!isOpen)}>This is a modals</h1>
        </div>
      )}
    </>,
    document.getElementById('signup-modal')
  );
};
