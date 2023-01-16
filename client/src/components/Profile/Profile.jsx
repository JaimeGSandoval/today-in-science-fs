import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { UsernameModal } from '../SettingsModals/UsernameModal';
import { EmailModal } from '../SettingsModals/EmailModal';
import { PasswordModal } from '../SettingsModals/PasswordModal';
import { ConfirmModal } from '../SettingsModals/ConfirmModal';
import { DeleteUserModal } from '../SettingsModals/DeleteUserModal';
import { httpLogoutUser } from '../../api/requests';
import { httpDeleteUserAccount } from '../../api/requests';
import styles from './_profile.module.scss';

export const Profile = ({ currentUser, setCurrentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateType, setUpdateType] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [logout, setLogout] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(false);

  const settingsFields = [
    {
      text: 'Username',
      updateType: 'username',
      fieldProp: currentUser && currentUser.user_name,
    },
    {
      text: 'Email',
      updateType: 'email',
      fieldProp: currentUser && currentUser.email,
    },
    {
      text: 'Reset Password',
      updateType: 'password',
    },
  ];

  useEffect(() => {
    let ignore = false;
    const storageKeys = ['favorite-articles', 'read-later-articles', 'articles'];

    const fetchData = async () => {
      if (!ignore) {
        const response = await httpLogoutUser();

        if (response.ok) {
          setLogoutSuccess(true);
          localStorage.removeItem('currentUser');
          storageKeys.forEach((key) => sessionStorage.removeItem(key));
          setCurrentUser(null);
        }
      }
    };

    if (logout) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [logout, setCurrentUser]);

  useEffect(() => {
    let ignore = false;
    const storageKeys = ['favorite-articles', 'read-later-articles', 'articles'];

    const fetchDeleteUser = async () => {
      if (!ignore && currentUser) {
        const response = await httpDeleteUserAccount(currentUser.user_id);

        if (response.ok) {
          localStorage.removeItem('currentUser');
          storageKeys.forEach((key) => sessionStorage.removeItem(key));
          setDeleteUserSuccess(true);
          setCurrentUser(null);
        }
      }
    };

    if (deleteUser) {
      fetchDeleteUser();
    }

    return () => {
      ignore = true;
    };
  }, [deleteUser, currentUser, setCurrentUser]);

  return (
    <>
      {(logoutSuccess || deleteUserSuccess) && <Navigate to='/' replace={true} />}
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Profile</h1>
            <div className={styles.fieldBox}>
              <span className={styles.field}>{currentUser && currentUser.user_name}</span>
              <span className={styles.field}>{currentUser && currentUser.email}</span>
            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Lists</h1>
            <div className={styles.fieldBox}>
              <Link
                to='/articles/favorite-articles'
                className={`${styles.fieldLink} ${styles.listLink}`}
              >
                Favorite Articles
              </Link>
              <Link
                to='/articles/read-later-articles'
                className={`${styles.fieldLink} ${styles.listLink}`}
              >
                Read Later Articles
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Settings</h1>
            <div className={styles.fieldsContainer}>
              {settingsFields.map((field) => (
                <div className={styles.fieldItem} key={field.text}>
                  <span className={styles.fieldBtn}>{`${field.text}${
                    field.updateType !== 'password' ? ':' : ''
                  } ${
                    currentUser && field.updateType !== 'password' ? field.fieldProp : ''
                  }`}</span>{' '}
                  <MdOutlineModeEditOutline
                    className={styles.editIcon}
                    onClick={() => {
                      setIsOpen(true);
                      setUpdateType(field.updateType);
                    }}
                  />
                </div>
              ))}
              {/* <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>{`Username: ${
                  currentUser && currentUser.user_name
                }`}</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(true);
                    setUpdateType('username');
                  }}
                />
              </div> */}
              {/* <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>{`Email: ${
                  currentUser && currentUser.email
                }`}</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(true);
                    setUpdateType('email');
                  }}
                />
              </div> */}
              {/* <div className={styles.fieldItem}>
                <span className={styles.fieldBtn}>Reset Password</span>{' '}
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={() => {
                    setIsOpen(true);
                    setUpdateType('password');
                  }}
                />
              </div> */}
              <span
                className={`${styles.fieldItem} ${styles.logoutBtn}`}
                onClick={() => setLogout(true)}
              >
                Log Out
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.deleteFieldBox}>
              <button
                className={styles.deleteFieldBtn}
                onClick={() => {
                  setIsOpen(true);
                  setUpdateType('delete');
                }}
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </section>
      {updateType === 'username' && (
        <UsernameModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentUser={currentUser}
          setConfirm={setConfirm}
        />
      )}
      {updateType === 'email' && (
        <EmailModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentUser={currentUser}
          setConfirm={setConfirm}
        />
      )}
      {updateType === 'password' && (
        <PasswordModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentUser={currentUser}
          updateType={updateType}
          setConfirm={setConfirm}
        />
      )}
      {updateType === 'delete' && (
        <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} setDeleteUser={setDeleteUser} />
      )}
      {confirm && <ConfirmModal setConfirm={setConfirm} updateType={updateType} />}
    </>
  );
};
