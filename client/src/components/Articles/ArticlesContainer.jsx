import React, { useState } from 'react';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';
import { SignupModal } from '../SignupModal';

export const ArticlesContainer = ({ articles, subject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const articleSubject = subject.replace('-', ' ');

  return (
    <>
      <section className={styles.articlesOuterContainer}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.articleNewsHeader}>{articleSubject}</h1>
          {articles.map((obj) => (
            <ArticleCard articleData={obj} key={obj.title} setIsOpen={setIsOpen} isOpen={isOpen} />
          ))}
        </div>
      </section>
      <SignupModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
