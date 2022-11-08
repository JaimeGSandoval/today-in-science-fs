import React from 'react';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';

export const ArticlesContainer = ({ articles, subject }) => {
  const articleSubject = subject.replace('-', ' ');

  return (
    <>
      <section className={styles.articlesOuterContainer}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.articleNewsHeader}>{articleSubject}</h1>
          {articles.map((obj) => (
            <ArticleCard articleData={obj} key={obj.title} />
          ))}
        </div>
      </section>
    </>
  );
};
