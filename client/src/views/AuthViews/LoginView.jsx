import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { UserContext } from '../../context/User.context';
// import { Header } from '../../components/Header';
import { httpLoginUser } from '../../api/requests';
import styles from './_forms.module.scss';

export const LoginView = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [userLoggedOut, setUserLoggedOut] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { setCurrentUser } = currentUserContext;

  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    let ignore = false;

    const userData = {
      email: userEmail,
      password: userPassword,
    };

    const fetchData = async () => {
      if (!ignore) {
        const response = await httpLoginUser(userData);

        if (!response) {
          setLoginFail(true);
          return;
        }

        setCurrentUser(response.data.user);
        setLoginSuccess(true);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      }
    };

    if (submit) {
      fetchData();
    }

    return () => {
      ignore = true;
      setSubmit(false);
    };
  }, [setCurrentUser, submit, userEmail, userPassword]);

  useEffect(() => {
    setUserLoggedOut(true);
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem('currentUser');

    if (localUser) {
      localStorage.removeItem('currentUser');
    }
  }, [userLoggedOut]);

  useEffect(() => {
    setLoginFail(false);
  }, [userEmail, userPassword]);

  return (
    <>
      <section className={styles.container}>
        {loginSuccess && <Navigate to='/' replace={true} />}
        <div className={styles.innerContainer}>
          <div className={styles.loginFormBox}>
            <h1 className={styles.headline}>Login</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldsWrapper}>
                <div className={styles.errBox}>
                  <span className={`${styles.errMessage} ${loginFail && styles.show}`}>
                    {loginFail && 'Email or password is invalid'}
                  </span>
                </div>
                <div className={`${styles.fieldBox} ${styles.fieldBoxLogin}`}>
                  <label className={styles.screenReaderText} htmlFor='email'>
                    email
                  </label>
                  <MdEmail className={styles.icon} />
                  <input
                    className={styles.field}
                    type='email'
                    id='email'
                    placeholder='Email'
                    required
                    aria-required
                    tabIndex={0}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div className={styles.fieldBox}>
                  <label className={styles.screenReaderText} htmlFor='password'>
                    password
                  </label>
                  <FaKey className={styles.icon} />
                  <input
                    className={styles.field}
                    type='password'
                    id='password'
                    placeholder='Password'
                    required
                    aria-required
                    tabIndex={0}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>

                <div className={styles.forgotPasswordBox}>
                  <small>
                    <Link to='/' className={styles.forgotText} tabIndex={0}>
                      Forgot password
                    </Link>{' '}
                    &nbsp;or&nbsp;
                    <Link to='/signup' className={styles.loginText} tabIndex={0}>
                      Sign up
                    </Link>
                  </small>
                </div>

                <button
                  className={
                    userEmail && userPassword ? styles.submitBtn : styles.disabledSubmitBtn
                  }
                  disabled={!userEmail || !userPassword ? true : false}
                  tabIndex={0}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
