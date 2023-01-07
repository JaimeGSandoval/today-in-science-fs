import React, { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { httpUpdatePasswordRequest } from '../../api/requests';
import { UserContext } from '../../context/User.context';
import styles from './_settingsModal.module.scss';

export const PasswordModal = ({ isOpen, setIsOpen, updateType, setConfirm }) => {
  const { currentUser } = useContext(UserContext);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const passwordRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const confirmRef = useRef();

  const [submit, setSubmit] = useState(false);

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
    console.log('I can');
  };

  useEffect(() => {
    const fetch = async () => {
      const passwordObj = {
        newPassword: password,
        userEmail: currentUser.email,
        updateType: 'reset',
        userId: currentUser.user_id,
      };

      try {
        await httpUpdatePasswordRequest(passwordObj);

        setConfirm(true);
        setIsOpen(false);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (submit) {
      fetch();
    }

    return () => setSubmit(false);
  }, [currentUser, password, setConfirm, setIsOpen, submit]);

  useEffect(() => {
    setPasswordErr(false);

    const passwordTrimmed = password.trim();

    if (!passwordTrimmed.length) {
      passwordRef.current.classList.remove(styles.validField);
      passwordRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (/\s/.test(passwordTrimmed)) {
      passwordRef.current.classList.add(styles.invalidField);
      setPasswordErr(true);
      setValidPassword(false);
      return;
    }

    if (passwordTrimmed.length < 6 || passwordTrimmed.length > 100) {
      passwordRef.current.classList.add(styles.invalidField);
      setValidPassword(false);
      return;
    }

    addValidOutline(passwordRef);
    setPasswordErr(false);
    setValidPassword(true);
  }, [password]);

  useEffect(() => {
    setConfirmErr(false);

    if (!confirmPassword.length) {
      confirmRef.current.classList.remove(styles.validField);
      confirmRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (password.trim() !== confirmPassword || password.trim().length !== confirmPassword.length) {
      confirmRef.current.classList.add(styles.invalidField);
      setConfirmErr(true);
      setValidConfirm(false);
      return;
    }

    addValidOutline(confirmRef);
    setConfirmErr(false);
    setValidConfirm(true);
  }, [confirmPassword, password]);

  return createPortal(
    <>
      {isOpen && (
        <>
          <div className={styles.container} onClick={() => setIsOpen(false)}></div>
          <form
            className={`${styles.innerContainer} ${
              updateType === 'password' && styles.customHeight
            }`}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.infoBox}>
              <h1 className={styles.titleText}>Reset Password</h1>

              <div className={styles.errBox}>
                <span
                  className={`${styles.errMessage} ${passwordErr && styles.show} ${
                    updateType === 'password' && styles.customTop
                  }`}
                >
                  Password cannot contain spaces
                </span>
              </div>

              <div
                className={`${styles.fieldBox} ${
                  updateType === 'password' && styles.customPadding
                }`}
              >
                <label className={styles.screenReaderText} htmlFor='password'>
                  password (min 6 characters)
                </label>

                <input
                  id='password'
                  className={styles.inputField}
                  type='password'
                  placeholder='Password (min 6 characters)'
                  required
                  aria-required
                  tabIndex={0}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  ref={passwordRef}
                  onBlur={(e) => removeOutline(e, validPassword)}
                />
              </div>

              <div className={styles.fieldBox}>
                <label className={styles.screenReaderText} htmlFor='confirmPassword'>
                  confirm password
                </label>

                <input
                  id='confirmPassword'
                  className={styles.inputField}
                  type='password'
                  placeholder='Confirm password'
                  required
                  aria-required
                  tabIndex={0}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  ref={confirmRef}
                  onBlur={(e) => removeOutline(e, validConfirm)}
                />
              </div>

              <div className={styles.errBox}>
                <span className={`${styles.errMessage} ${confirmErr && styles.show}`}>
                  Passwords do not match
                </span>
              </div>

              <div className={styles.btnBox}>
                <div className={styles.btnBoxInner}>
                  <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className={
                      validPassword && validConfirm ? styles.saveButton : styles.disabledBtn
                    }
                    type={'submit'}
                    disabled={validPassword && validConfirm ? false : true}
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
