import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { UsernameModal } from '../SettingsModals/UsernameModal';
import { EmailModal } from '../SettingsModals/EmailModal';
import { PasswordModal } from '../SettingsModals/PasswordModal';
import styles from './_profile.module.scss';

export const Profile = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateType, setUpdateType] = useState('');

  return (
    <>
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Profile</h1>
            <div className={styles.fieldBox}>
              <span className={styles.field}>{currentUser.user_name}</span>
              <span className={styles.field}>{currentUser.email}</span>
            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Lists</h1>
            <div className={styles.fieldBox}>
              <Link to='/articles/favorite-articles' className={styles.fieldLink}>
                Favorite Articles
              </Link>
              <Link to='/articles/read-later-articles' className={styles.fieldLink}>
                Read Later Articles
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Settings</h1>
            <div className={styles.fieldsContainer}>
              <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>{`Username: ${currentUser.user_name}`}</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setUpdateType('username');
                  }}
                />
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>{`Email: ${currentUser.email}`}</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setUpdateType('email');
                  }}
                />
              </div>
              <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>Reset Password</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setUpdateType('password');
                  }}
                />
              </div>
              <span className={styles.fieldItem}>Log Out</span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.deleteFieldBox}>
              <button className={styles.deleteFieldBtn}>Delete Account</button>
            </div>
          </section>
        </div>
      </section>
      {updateType === 'username' && (
        <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} currentUser={currentUser} />
      )}
      {updateType === 'email' && (
        <EmailModal isOpen={isOpen} setIsOpen={setIsOpen} currentUser={currentUser} />
      )}
      {updateType === 'password' && (
        <PasswordModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentUser={currentUser}
          updateType={updateType}
        />
      )}
    </>
  );
};
