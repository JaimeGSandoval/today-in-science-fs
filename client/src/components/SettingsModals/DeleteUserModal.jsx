import React from 'react';
import { createPortal } from 'react-dom';
import styles from './_settingsModal.module.scss';

export const DeleteUserModal = ({ isOpen, setIsOpen, setDeleteUser }) => {
  const handleDelete = () => {
    setDeleteUser(true);
    setIsOpen(false);
  };

  return createPortal(
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.innerContainer} data-inner={'inner'}>
            <div className={styles.deleteInfoBox}>
              <span className={styles.deleteText} data-text={'text'}>
                Are you sure you'd like to delete your account? This action is irreversible.
              </span>
              <div className={styles.btnBox}>
                <div className={styles.btnBoxInner}>
                  <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button className={styles.deleteButton} onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('delete-modal')
  );
};
