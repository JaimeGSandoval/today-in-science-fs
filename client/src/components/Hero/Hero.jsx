import React from 'react';
import styles from './_hero.module.scss';
import medium from '../../assets/images/ai-md.png';
import large from '../../assets/images/ai-lg.png';
import aiWebp from '../../assets/images/ai.webp';

export const Hero = () => {
  return (
    <>
      <section className={styles.heroContainer}>
        <div className={styles.overlay}>
          <div className={styles.heroInfoBox}>
            <div className={styles.headlineContainer}>
              <a href='/' className={styles.heroHeadline}>
                Robotics
              </a>
            </div>

            <div className={styles.titleContainer}>
              <a
                href='https://www.sciencedaily.com/releases/2022/10/221021163556.htm'
                className={styles.heroArticleTitle}
                target='_blank'
                rel='noreferrer'
              >
                Tentacle robot can gently grasp fragile objects
              </a>
            </div>

            <div className={styles.readArticleContainer}>
              <a
                href='https://www.sciencedaily.com/releases/2022/10/221021163556.htm'
                className={styles.readArticleLink}
                target='_blank'
                rel='noreferrer'
              >
                Read Article <span className={styles.greaterThan}>&#62;</span>
              </a>
            </div>
          </div>
        </div>
        <picture>
          <source type='image/webp' srcSet={aiWebp} />
          <source type='image/png' srcSet={`${medium} 600w, ${large} 1200w`} />
          <img className={styles.heroImg} src={medium} alt='' />
        </picture>
      </section>
    </>
  );
};
