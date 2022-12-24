import React from 'react';
import { Link } from 'react-router-dom';
import styles from './_profile.module.scss';

export const Profile = ({ currentUser }) => {
  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Profile</h1>
          <div className={styles.fieldBox}>
            <span className={styles.field}>{currentUser.user_name}</span>
            <span className={styles.field}>{currentUser.email}</span>
          </div>
        </section>

        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Lists</h1>
          <div className={styles.fieldBox}>
            <Link to='/articles/favorite-articles' className={styles.fieldLink}>
              Favorite Articles
            </Link>
            <Link to='/articles/read-later-articles' className={styles.fieldLink}>
              Read Later Articles
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Settings</h1>
          <div className={styles.fieldBox}>
            <button className={styles.fieldBtn}>{`Username: ${currentUser.user_name}`}</button>
            <button className={styles.fieldBtn}>{`Email: ${currentUser.email}`}</button>
            <button className={styles.fieldBtn}>Reset Password</button>
            <button className={styles.fieldBtn}>Log Out</button>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.deleteFieldBox}>
            <button className={styles.deleteFieldBtn}>Delete Account</button>
          </div>
        </section>
      </div>
    </section>
  );
};
