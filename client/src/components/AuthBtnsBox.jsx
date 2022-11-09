import React from 'react';
import { Link } from 'react-router-dom';

export const AuthBtnsBox = ({ styles, setIsOpen }) => {
  return (
    <>
      <ul className={styles.authBtnsBox}>
        <li>
          <Link
            to='/signup'
            className={styles.authBtn}
            onClick={setIsOpen ? () => setIsOpen(false) : null}
          >
            Sign Up
          </Link>
        </li>
        <span className={styles.pipe}>|</span>
        <li>
          <Link
            to='/login'
            className={styles.authBtn}
            onClick={setIsOpen ? () => setIsOpen(false) : null}
          >
            Login
          </Link>
        </li>
      </ul>
    </>
  );
};
