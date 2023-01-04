import React, { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { httpUpdateEmailRequest } from '../../api/requests';
import { UserContext } from '../../context/User.context';
import styles from './_settingsModal.module.scss';

export const EmailModal = ({ isOpen, setIsOpen, updateType }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const emailRef = useRef();
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
      const emailObj = {
        newEmail: email,
        userId: currentUser.user_id,
      };

      try {
        await httpUpdateEmailRequest(emailObj);

        // setCurrentUser({
        //   ...currentUser,
        //   email,
        // });

        // localStorage.setItem(
        //   'currentUser',
        //   JSON.stringify({
        //     ...currentUser,
        //     email,
        //   })
        // );

        setIsOpen(false);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (submit) {
      fetch();
    }

    return () => setSubmit(false);
  }, [currentUser, currentUser.user_id, setCurrentUser, setIsOpen, submit, email]);

  const isEmail = (emailVal) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailVal);

  useEffect(() => {
    setEmailErr(false);
    setEmailTaken(false);

    const emailTrimmed = email.trim();

    if (!emailTrimmed.length) {
      emailRef.current.classList.remove(styles.validField);
      emailRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (!isEmail(emailTrimmed)) {
      emailRef.current.classList.add(styles.invalidField);
      setEmailErr(true);
      setValidEmail(false);
      return;
    }

    addValidOutline(emailRef);
    setValidEmail(true);
    setEmailErr(false);
  }, [email]);

  return createPortal(
    <>
      {isOpen && (
        <>
          <div className={styles.container} onClick={() => setIsOpen(false)}></div>
          <form className={styles.innerContainer} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.infoBox}>
              <h1 className={styles.text}>Update Email</h1>

              <input
                type='email'
                className={styles.inputField}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={email}
                onBlur={(e) => removeOutline(e, validEmail)}
                ref={emailRef}
              />

              <div className={styles.errBox}>
                <span
                  className={`${styles.errMessage} ${emailErr && styles.show} ${
                    emailTaken && styles.show
                  }`}
                >
                  {emailTaken && 'Email already registered'}
                  {emailErr && 'Must be a valid email'}
                </span>
              </div>
              <div className={styles.btnBox}>
                <div className={styles.btnBoxInner}>
                  <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className={validEmail ? styles.saveButton : styles.disabledBtn}
                    type={'submit'}
                    disabled={validEmail ? false : true}
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
    document.getElementById('email-modal')
  );
};
