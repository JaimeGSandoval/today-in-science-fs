import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { httpSignupUser } from '../../api/requests';
import { SignupSuccessModal } from './SignupSuccessModal';
import { FooterContext } from '../../context/Footer.context';
// import { Header } from '../../components/Header';
import bowser from 'bowser';
import styles from './_forms.module.scss';

export const SignupView = () => {
  const [usernameData, setUsernameData] = useState({
    username: '',
    validUsername: false,
    usernameErr: false,
    usernameTaken: false,
  });
  const usernameRef = useRef();

  const [emailData, setEmailData] = useState({
    email: '',
    validEmail: false,
    emailErr: false,
    emailTaken: false,
  });
  const emailRef = useRef();

  const [passwordData, setPasswordData] = useState({
    password: '',
    validPassword: false,
    passwordErr: false,
  });
  const passwordRef = useRef();

  const [confirmPasswordData, setConfirmPasswordData] = useState({
    confirmPassword: '',
    validConfirm: false,
    confirmErr: false,
  });
  const confirmRef = useRef();

  const [validSuccess, setValidSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { setShowFooter } = useContext(FooterContext);

  const addValidOutline = (refVal) => {
    refVal.current.classList.remove(styles.invalidField);
    refVal.current.classList.add(styles.validField);
  };

  const removeOutline = (e, stateVal) => {
    if (!stateVal) {
      e.target.classList.remove(styles.validField);
    }
  };

  let customMargin = false;
  var result = bowser.getParser(window.navigator.userAgent);
  if (
    result.parsedResult.browser.name === 'Safari' ||
    result.parsedResult.browser.name === 'Chrome'
  ) {
    customMargin = true;
  }

  useEffect(() => {
    setUsernameData((usernameData) => ({
      ...usernameData,
      usernameErr: false,
      usernameTaken: false,
    }));

    const usernameTrimmed = usernameData.username.trim();

    if (!usernameTrimmed.length) {
      usernameRef.current.classList.remove(styles.validField);
      usernameRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (/\s/.test(usernameTrimmed) || usernameTrimmed.length < 6 || usernameTrimmed.length > 20) {
      usernameRef.current.classList.add(styles.invalidField);

      setUsernameData((usernameData) => ({
        ...usernameData,
        usernameErr: true,
        validUsername: false,
      }));
      return;
    }

    if (/[a-zA-Z0-9]/.test(usernameTrimmed)) {
      addValidOutline(usernameRef);

      setUsernameData((usernameData) => ({
        ...usernameData,
        usernameErr: false,
        validUsername: true,
      }));
    }
  }, [usernameData.username]);

  const isEmail = (emailVal) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailVal);

  useEffect(() => {
    setEmailData((emailData) => ({
      ...emailData,
      emailErr: false,
      emailTaken: false,
    }));

    const emailTrimmed = emailData.email.trim();

    if (!emailTrimmed.length) {
      emailRef.current.classList.remove(styles.validField);
      emailRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (!isEmail(emailTrimmed)) {
      emailRef.current.classList.add(styles.invalidField);

      setEmailData((emailData) => ({
        ...emailData,
        emailErr: true,
        validEmail: false,
      }));

      return;
    }

    addValidOutline(emailRef);

    setEmailData((emailData) => ({
      ...emailData,
      emailErr: false,
      validEmail: true,
    }));
  }, [emailData.email]);

  useEffect(() => {
    setPasswordData((passwordData) => ({
      ...passwordData,
      passwordErr: false,
    }));

    const passwordTrimmed = passwordData.password.trim();

    if (!passwordTrimmed.length) {
      passwordRef.current.classList.remove(styles.validField);
      passwordRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (/\s/.test(passwordTrimmed)) {
      passwordRef.current.classList.add(styles.invalidField);

      setPasswordData((passwordData) => ({
        ...passwordData,
        passwordErr: true,
        validPassword: false,
      }));
      return;
    }

    if (passwordTrimmed.length < 6 || passwordTrimmed.length > 100) {
      passwordRef.current.classList.add(styles.invalidField);

      setPasswordData((passwordData) => ({
        ...passwordData,
        validPassword: false,
      }));
      return;
    }

    addValidOutline(passwordRef);

    setPasswordData((passwordData) => ({
      ...passwordData,
      passwordErr: false,
      validPassword: true,
    }));
  }, [passwordData.password]);

  useEffect(() => {
    setConfirmPasswordData((confirmPasswordData) => ({
      ...confirmPasswordData,
      confirmErr: false,
    }));

    if (!confirmPasswordData.confirmPassword.length) {
      confirmRef.current.classList.remove(styles.validField);
      confirmRef.current.classList.remove(styles.invalidField);
      return;
    }

    if (
      passwordData.password.trim() !== confirmPasswordData.confirmPassword ||
      passwordData.password.trim().length !== confirmPasswordData.confirmPassword.length
    ) {
      confirmRef.current.classList.add(styles.invalidField);

      setConfirmPasswordData((confirmPasswordData) => ({
        ...confirmPasswordData,
        confirmErr: true,
        validConfirm: false,
      }));
      return;
    }

    addValidOutline(confirmRef);

    setConfirmPasswordData((confirmPasswordData) => ({
      ...confirmPasswordData,
      confirmErr: false,
      validConfirm: true,
    }));
  }, [confirmPasswordData.confirmPassword, passwordData.password]);

  useEffect(() => {
    const { validUsername } = usernameData;
    const { validEmail } = emailData;
    const { validPassword } = passwordData;
    const { validConfirm } = confirmPasswordData;

    if (validUsername && validEmail && validPassword && validConfirm) {
      setValidSuccess(true);
    } else {
      setValidSuccess(false);
    }
  }, [usernameData, emailData, passwordData, confirmPasswordData]);

  const userData = useMemo(
    () => ({
      userName: usernameData.username.trim(),
      email: emailData.email.trim(),
      password: passwordData.password.trim(),
      passwordConfirm: confirmPasswordData.confirmPassword.trim(),
      role: 'user',
    }),
    [
      confirmPasswordData.confirmPassword,
      emailData.email,
      passwordData.password,
      usernameData.username,
    ]
  );

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!ignore) {
        const response = await httpSignupUser(userData);

        if (response.error && response.type === 'username') {
          setUsernameData({
            ...usernameData,
            usernameTaken: true,
          });
          return;
        }

        if (response.error && response.type === 'email') {
          setEmailData({
            ...emailData,
            emailTaken: true,
          });
          return;
        }

        setUsernameData({
          ...usernameData,
          username: '',
        });

        setEmailData({
          ...emailData,
          email: '',
        });

        setPasswordData({
          ...passwordData,
          password: '',
        });

        setConfirmPasswordData({
          ...confirmPasswordData,
          confirmPassword: '',
        });

        // setSubmitSuccess(true);
        setSuccessModalOpen(true);
        setSubmit(false);
      }
    };

    if (submit) {
      fetchData();
    }

    return () => {
      ignore = true;
      setSubmit(false);
    };
  }, [confirmPasswordData, emailData, passwordData, submit, userData, usernameData]);

  useEffect(() => {
    setShowFooter(false);
    return () => setShowFooter(true);
  }, [setShowFooter]);

  const handleChange = (e, formData, setFn) => {
    setFn({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <>
      <section className={styles.container}>
        {successModalOpen && <SignupSuccessModal setSuccessModalOpen={setSuccessModalOpen} />}
        <div className={`${styles.signupInnerContainer} ${customMargin && styles.customMargin}`}>
          <div className={styles.signupFormBox}>
            <h1 className={styles.headline}>Sign up</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldsWrapper}>
                <div className={styles.errBox}>
                  <span
                    className={`${styles.errMessage} ${usernameData.usernameErr && styles.show} ${
                      usernameData.usernameTaken && styles.show
                    }`}
                  >
                    {usernameData.usernameTaken && 'Username taken'}
                    {usernameData.usernameErr && '6 to 20 letters or numbers and no spaces'}
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
                    onChange={(e) => handleChange(e, usernameData, setUsernameData)}
                    value={usernameData.username}
                    ref={usernameRef}
                    onBlur={(e) => removeOutline(e, usernameData.validUsername)}
                    name={'username'}
                  />
                </div>

                <div className={styles.errBox}>
                  <span
                    className={`${styles.errMessage} ${emailData.emailTaken && styles.show} ${
                      emailData.emailErr && styles.show
                    }`}
                  >
                    {emailData.emailTaken && 'Email already registered'}
                    {emailData.emailErr && 'Must be a valid email'}
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
                    onChange={(e) => handleChange(e, emailData, setEmailData)}
                    value={emailData.email}
                    ref={emailRef}
                    onBlur={(e) => removeOutline(e, emailData.validEmail)}
                    name='email'
                  />
                </div>

                <div className={styles.errBox}>
                  <span
                    className={`${styles.errMessage} ${passwordData.passwordErr && styles.show}`}
                  >
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
                    onChange={(e) => handleChange(e, passwordData, setPasswordData)}
                    value={passwordData.password}
                    ref={passwordRef}
                    onBlur={(e) => removeOutline(e, passwordData.validPassword)}
                    name='password'
                  />
                </div>

                <div className={styles.errBox}>
                  <span
                    className={`${styles.errMessage} ${
                      confirmPasswordData.confirmErr && styles.show
                    }`}
                  >
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
                    onChange={(e) => handleChange(e, confirmPasswordData, setConfirmPasswordData)}
                    value={confirmPasswordData.confirmPassword}
                    ref={confirmRef}
                    onBlur={(e) => removeOutline(e, confirmPasswordData.validConfirm)}
                    name='confirmPassword'
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
                  className={validSuccess ? styles.submitBtn : styles.disabledSubmitBtn}
                  tabIndex={0}
                  disabled={validSuccess ? false : true}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
