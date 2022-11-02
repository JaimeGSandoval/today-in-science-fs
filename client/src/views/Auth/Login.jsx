import React from 'react';
import { Link } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './_forms.module.scss';

export const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.formBox}>
          <h1 className={styles.headline}>Login</h1>

          <form action='' className={styles.form}>
            <div className={styles.fieldsWrapper}>
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
                  password
                </label>
                <FaKey className={styles.icon} />
                <input
                  className={styles.field}
                  type='password'
                  id='password'
                  placeholder='Password'
                  minlength='6'
                  required
                  aria-required
                  tabIndex={0}
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

              <button className={styles.submitBtn} tabIndex={0}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
