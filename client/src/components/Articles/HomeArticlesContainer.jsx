import React, { useState, useEffect } from 'react';
import styles from './_articles.module.scss';
import { HomeArticleCard } from './HomeArticleCard';

export const HomeArticlesContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const getHomeArticles = async () => {
      const response = await fetch('http://localhost:8000/news/initiate');
      const data = await response.json();
      setArticles(data);
      setIsLoading(false);
    };

    getHomeArticles();
  }, []);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.homeArticlesContainer}>
          <h1 className={styles.newsHeader}>Latest Articles</h1>
          {isLoading && <h1 style={{ color: 'white' }}>Loading ...</h1>}
          {!isLoading &&
            articles.map((article) => (
              <HomeArticleCard articleData={article} key={article.title} />
            ))}
        </div>
      </section>
    </>
  );
};
