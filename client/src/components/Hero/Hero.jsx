import React from 'react';
import styles from './_hero.module.scss';
import medium from '../../assets/images/ai-md.png';
import large from '../../assets/images/ai-lg.png';
import aiWebp from '../../assets/images/ai.webp';

export const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <picture>
        <source type='image/webp' srcSet={aiWebp} />
        <source type='image/png' srcSet={`${medium} 600w, ${large} 1200w`} />
        <img className={styles.heroImg} src={medium} alt='' />
      </picture>
    </section>
  );
};
