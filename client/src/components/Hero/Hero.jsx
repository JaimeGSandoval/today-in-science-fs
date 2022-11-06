import React from 'react';
import styles from './_hero.module.scss';
import medium from '../../assets/images/ai-md.png';
import large from '../../assets/images/ai-lg.png';
import aiWebp from '../../assets/images/ai.webp';

export const Hero = ({ heroArticle, isLoading }) => {
  let article;
  let articleSubject;
  let articleDate;

  if (!isLoading) {
    article = heroArticle.article;
    articleSubject = heroArticle.subject.replace('-', ' ');
    articleDate = new Date(article.pubDate).toDateString();
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
          {isLoading && <h1 style={{ color: 'white' }}>Loading ...</h1>}
          {!isLoading && (
            <div className={styles.heroInfoBox}>
              <div className={styles.headlineContainer}>
                <a href='/' className={styles.heroSubject}>
                  {articleSubject}
                </a>
              </div>

              <div className={styles.titleContainer}>
                <span className={styles.heroArticleTitle}>{article.title}</span>
                <span className={styles.articleDate}>{articleDate}</span>
              </div>

              <div className={styles.readArticleContainer}>
                <a
                  href={article.link}
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
