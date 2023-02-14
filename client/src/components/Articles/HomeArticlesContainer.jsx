import React, { useState, useEffect } from 'react';
import styles from './_articles.module.scss';
import { HomeArticleCard } from './HomeArticleCard';
import { SignupModal } from '../SignupModal';

export const HomeArticlesContainer = ({ articles, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.homeArticlesContainer}>
          <h1 className={styles.newsHeader}>Latest Articles</h1>
          {isLoading && <h1 style={{ color: 'white' }}>Loading ...</h1>}
          {!isLoading &&
            articles.map((article) => (
              <HomeArticleCard
                articleData={article}
                key={article.title}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}
        </div>
      </section>
      <SignupModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
