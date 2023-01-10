import React, { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { httpUpdateUsername } from '../../api/requests';
import { UserContext } from '../../context/User.context';
import { fetchUpdate } from '../../utils/helpers';
import styles from './_settingsModal.module.scss';

export const UsernameModal = ({ isOpen, setIsOpen, updateType, setConfirm }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser.user_name);
  const [usernameErr, setUsernameErr] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [submit, setSubmit] = useState(false);
  const usernameRef = useRef();

  const addValidOutline = (refVal) => {
    if (refVal.current) {
      refVal.current.classList.remove(styles.invalidField);
      refVal.current.classList.add(styles.validField);
    }
  };

  const removeOutline = (e, stateVal) => {
    if (!stateVal) {
      e.target.classList.remove(styles.validField);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const usernameObj = {
        type: 'username',
        httpFn: httpUpdateUsername,
        currentUser,
        setCurrentUser,
        newUsername: username,
        userId: currentUser.user_id,
        setSubmit,
        setIsOpen,
        setConfirm,
        setUsernameTaken,
      };

      if (!ignore) {
        fetchUpdate(usernameObj);
      }
    };

    if (submit) {
      fetchData();
    }

    return () => {
      ignore = true;
      setSubmit(false);
    };
  }, [currentUser, currentUser.user_id, setConfirm, setCurrentUser, setIsOpen, submit, username]);

  useEffect(() => {
    setUsernameErr(false);
    setUsernameTaken(false);

    const usernameTrimmed = username.trim();

    if (!usernameTrimmed.length) {
      usernameRef.current.classList.remove(styles.validField);
      usernameRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (/\s/.test(usernameTrimmed) || usernameTrimmed.length < 6 || usernameTrimmed.length > 20) {
      usernameRef.current.classList.add(styles.invalidField);
      setUsernameErr(true);
      setValidUsername(false);
      return;
    }

    if (/[a-zA-Z0-9]/.test(usernameTrimmed)) {
      addValidOutline(usernameRef);
      setUsernameErr(false);
      setValidUsername(true);
    }
  }, [username]);

  return createPortal(
    <>
      {isOpen && (
        <>
          <div className={styles.container} onClick={() => setIsOpen(false)}></div>
          <form className={styles.innerContainer} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.infoBox}>
              <h1 className={styles.titleText}>Update Username</h1>
              <input
                type='text'
                className={styles.inputField}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder={username}
                onBlur={(e) => removeOutline(e, validUsername)}
                ref={usernameRef}
              />
              <div className={styles.errBox}>
                <span
                  className={`${styles.errMessage} ${usernameErr && styles.show} ${
                    usernameTaken && styles.show
                  }`}
                >
                  {usernameTaken && 'Username taken'}
                  {usernameErr && '6 to 20 letters or numbers and no spaces'}
                </span>
              </div>
              <div className={styles.btnBox}>
                <div className={styles.btnBoxInner}>
                  <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className={validUsername ? styles.saveButton : styles.disabledBtn}
                    type={'submit'}
                    disabled={validUsername ? false : true}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>,
    document.getElementById('username-modal')
  );
};
