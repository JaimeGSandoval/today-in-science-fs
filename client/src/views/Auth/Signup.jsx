import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './_forms.module.scss';
import { HeaderLogo } from '../../components/HeaderLogo';

export const Signup = () => {
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
                className={styles.field}
                type='text'
                id='username'
                placeholder='Username (6 - 20) characters'
                required
                aria-required
                tabIndex={0}
                minLength={6}
                maxLength={20}
              />
            </div>

            <div className={styles.fieldBox}>
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
              />
            </div>

            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='password'>
                password (min 6 characters)
              </label>
              <FaLock className={styles.icon} />
              <input
                className={styles.field}
                type='password'
                id='password'
                placeholder='Password (min 6 characters)'
                minLength='6'
                required
                aria-required
                tabIndex={0}
              />
            </div>

            <div className={styles.fieldBox}>
              <label className={styles.screenReaderText} htmlFor='confirmPassword'>
                confirm password
              </label>
              <FaKey className={styles.icon} />
              <input
                className={styles.field}
                type='password'
                id='confirmPassword'
                placeholder='Confirm password'
                required
                aria-required
                tabIndex={0}
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

            <button className={styles.signupSubmitBtn} tabIndex={0}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
