import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './_forms.module.scss';
import { HeaderLogo } from '../../components/HeaderLogo';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const usernameRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const emailRef = useRef();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const passwordRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirm, setValidConfirm] = useState(false);
  const confirmRef = useRef();

  const [success, setSuccess] = useState(false);

  const addValidOutline = (refVal) => {
    refVal.current.classList.add(styles.validField);
    refVal.current.classList.remove(styles.invalidField);
  };

  const removeValidOutline = (refVal) => {
    refVal.current.classList.add(styles.invalidField);
    refVal.current.classList.remove(styles.validField);
  };

  useEffect(() => {
    if (username.length < 6) {
      removeValidOutline(usernameRef);
      setValidUsername(false);
    } else {
      addValidOutline(usernameRef);
      setValidUsername(true);
    }
  }, [username]);

  useEffect(() => {
    if (email.length < 6) {
      removeValidOutline(emailRef);
      setValidEmail(false);
    } else {
      addValidOutline(emailRef);
      setValidEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 6) {
      removeValidOutline(passwordRef);
      setValidPassword(false);
    } else {
      addValidOutline(passwordRef);
      setValidPassword(true);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword.length < 6) {
      removeValidOutline(confirmRef);
      setValidConfirm(false);
    } else {
      addValidOutline(confirmRef);
      setValidConfirm(true);
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (validUsername && validEmail && validPassword && validConfirm) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [validUsername, validEmail, validPassword, validConfirm]);

  return (
    <section className={styles.container}>
      <HeaderLogo />
      <div className={styles.signupFormBox}>
        <h1 className={styles.headline}>Sign up</h1>

        <form action='' className={styles.form}>
          <div className={styles.fieldsWrapper}>
            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='username'>
                username (6 - 20) characters
              </label>
              <FaUser className={styles.icon} />
              <input
                id='username'
                className={styles.field}
                type='text'
                placeholder='Username (6 - 20) characters'
                required
                aria-required
                tabIndex={0}
                minLength={6}
                maxLength={20}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                ref={usernameRef}
              />
            </div>

            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='email'>
                email
              </label>
              <MdEmail className={styles.icon} />
              <input
                id='email'
                className={styles.field}
                type='email'
                placeholder='Email'
                required
                aria-required
                tabIndex={0}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
              />
            </div>

            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='password'>
                password (min 6 characters)
              </label>
              <FaLock className={styles.icon} />
              <input
                id='password'
                className={styles.field}
                type='password'
                placeholder='Password (min 6 characters)'
                minLength='6'
                required
                aria-required
                tabIndex={0}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                ref={passwordRef}
              />
            </div>

            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='confirmPassword'>
                confirm password
              </label>
              <FaKey className={styles.icon} />
              <input
                id='confirmPassword'
                className={styles.field}
                type='password'
                placeholder='Confirm password'
                required
                aria-required
                tabIndex={0}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                ref={confirmRef}
              />
            </div>

            <div className={styles.forgotPasswordBox}>
              <small>
                Already a member? &nbsp;
                <Link to='/login' className={styles.loginText} tabIndex={0}>
                  Login
                </Link>
              </small>
            </div>

            <button
              className={success ? styles.signupSubmitBtn : styles.disabledSubmitBtn}
              tabIndex={0}
              disabled={success ? false : true}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
