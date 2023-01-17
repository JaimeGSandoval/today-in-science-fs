import React from 'react';
import { createPortal } from 'react-dom';
import { RiCloseFill } from 'react-icons/ri';
import styles from './_settingsModal.module.scss';

export const ConfirmModal = ({ setConfirm, updateType }) => {
  let confirmText;

  if (updateType === 'email' || updateType === 'password') {
    confirmText = 'Please check your email for a verification link to complete the update process.';
  } else {
    confirmText = 'Username updated';
  }

  const handleClose = async (e) => {
    if (
      e.target.attributes.getNamedItem('data-inner') ||
      e.target.attributes.getNamedItem('data-text')
    )
      return;

    setConfirm(false);
  };

  const closeStyle = {
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
  };

  return createPortal(
    <>
      {
        <div className={styles.container} onClick={handleClose}>
          <div
            className={`${
              updateType === 'username'
                ? styles.confirmUpdateInner
                : styles.confirmUpdateInnerPasswordEmail
            }`}
            data-inner={'inner'}
          >
            <div className={styles.closeBox}>
              <RiCloseFill style={closeStyle}></RiCloseFill>
            </div>
            <div className={styles.infoBox}>
              <span
                className={`${updateType === 'username' ? styles.usernameText : styles.emailText}`}
                data-text={'text'}
              >
                {confirmText}
              </span>
            </div>
          </div>
        </div>
      }
    </>,
    document.getElementById('confirm-modal')
  );
};
