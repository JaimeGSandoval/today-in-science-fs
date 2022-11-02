import React from 'react';
import styles from './_profile.module.scss';

export const Profile = () => {
  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Profile</h1>
          <div className={styles.fieldBox}>
            <span className={styles.field}>HokageDev</span>
            <span className={styles.field}>hokage@gmail.com</span>
          </div>
        </section>

        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Lists</h1>
          <div className={styles.fieldBox}>
            <a href='/' className={styles.fieldLink}>
              Favorite Articles
            </a>
            <a href='/' className={styles.fieldLink}>
              Read Later Articles
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Settings</h1>
          <div className={styles.fieldBox}>
            <button className={styles.fieldBtn}>Username: HokageDev</button>
            <button className={styles.fieldBtn}>Email: hokage@gmail.com</button>
            <button className={styles.fieldBtn}>Reset Password</button>
            <button className={styles.fieldBtn}>Sign Out</button>
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
