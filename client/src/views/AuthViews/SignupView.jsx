import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HeaderLogo } from '../../components/HeaderLogo';
import { httpSignupUser } from '../../api/requests';
import styles from './_forms.module.scss';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameErr, setUsernameErr] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const usernameRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const emailRef = useRef();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const passwordRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const confirmRef = useRef();

  const [validSuccess, setValidSuccess] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const addValidOutline = (refVal) => {
    refVal.current.classList.remove(styles.invalidField);
    refVal.current.classList.add(styles.validField);
  };

  const removeOutline = (e, stateVal) => {
    if (!stateVal) {
      e.target.classList.remove(styles.validField);
    }
  };

  const handleSubmit = async (e, userData) => {
    e.preventDefault();

    const response = await httpSignupUser(userData);

    if (response.error && response.type === 'username') {
      setUsernameTaken(true);
      return;
    }

    if (response.error && response.type === 'email') {
      setEmailTaken(true);
      return;
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSubmitSuccess(true);
  };

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

  useEffect(() => {
    if (validUsername && validEmail && validPassword && validConfirm) {
      setValidSuccess(true);
    } else {
      setValidSuccess(false);
    }
  }, [validUsername, validEmail, validPassword, validConfirm]);

  const userData = {
    userName: username.trim(),
    email: email.trim(),
    password: password.trim(),
    passwordConfirm: confirmPassword.trim(),
    role: 'user',
  };

  return (
    <section className={styles.container}>
      {submitSuccess && <Navigate to='/login' replace={true} />}
      <HeaderLogo />
      <div className={styles.signupFormBox}>
        <h1 className={styles.headline}>Sign up</h1>

        <form action='' className={styles.form} onSubmit={(e) => handleSubmit(e, userData)}>
          <div className={styles.fieldsWrapper}>
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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                ref={usernameRef}
                onBlur={(e) => removeOutline(e, validUsername)}
              />
            </div>

            <div className={styles.errBox}>
              <span
                className={`${styles.errMessage} ${emailTaken && styles.show} ${
                  emailErr && styles.show
                }`}
              >
                {emailTaken && 'Email already registered'}
                {emailErr && 'Must be a valid email'}
              </span>
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
                onBlur={(e) => removeOutline(e, validEmail)}
              />
            </div>

            <div className={styles.errBox}>
              <span className={`${styles.errMessage} ${passwordErr && styles.show}`}>
                Password cannot contain spaces
              </span>
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
                required
                aria-required
                tabIndex={0}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                ref={passwordRef}
                onBlur={(e) => removeOutline(e, validPassword)}
              />
            </div>

            <div className={styles.errBox}>
              <span className={`${styles.errMessage} ${confirmErr && styles.show}`}>
                Passwords do not match
              </span>
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
                onBlur={(e) => removeOutline(e, validConfirm)}
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
              className={validSuccess ? styles.signupSubmitBtn : styles.disabledSubmitBtn}
              tabIndex={0}
              disabled={validSuccess ? false : true}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
