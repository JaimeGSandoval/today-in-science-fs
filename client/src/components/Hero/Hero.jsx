import React from 'react';
import { Spinner } from '../Spinner';
import medium from '../../assets/images/jpg/artificial-intelligence-md.png';
import large from '../../assets/images/jpg/artificial-intelligence-lg.png';
import aiWebp from '../../assets/images/webp/artificial-intelligence.webp';
import styles from './_hero.module.scss';

export const Hero = ({ heroArticle, isLoading }) => {
  let article;
  let articleDate;
  let articleProvider;

  if (!isLoading) {
    article = heroArticle;
    articleDate = new Date(heroArticle.datePublished).toDateString();
    articleProvider = heroArticle.provider[0].name;
  }

  return (
    <>
      <section className={styles.heroContainer}>
        <picture>
          <source type='image/webp' srcSet={aiWebp} />
          <source type='image/png' srcSet={`${medium} 600w, ${large} 1200w`} />
          <img className={styles.heroImg} src={medium} alt='' />
        </picture>
        <div className={styles.overlay}>
          {isLoading && <Spinner styles={styles} />}
          {!isLoading && (
            <div className={styles.heroInfoBox}>
              <div className={styles.headlineContainer}>
                <span className={styles.heroProvider}>{articleProvider}</span>
              </div>

              <div className={styles.titleContainer}>
                <span className={styles.heroArticleTitle}>{article.name}</span>
                <span className={styles.articleDate}>{articleDate}</span>
              </div>

              <div className={styles.readArticleContainer}>
                <a
                  href={article.url}
                  className={styles.readArticleLink}
                  target='_blank'
                  rel='noreferrer'
                >
                  Read Article
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
