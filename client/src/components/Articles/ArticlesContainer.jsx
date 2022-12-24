import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { useParams } from 'react-router-dom';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';

export const ArticlesContainer = () => {
  const { articlesType } = useParams();
  const [favArticles, setFavArticles] = useState([]);
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(
        `http://localhost:8000/articles/${articlesType}/${currentUser.user_id}`,
        {
          credentials: 'include',
        }
      );
      const retrievedArticles = await response.json();

      if (retrievedArticles.data.favoriteArticles) {
        if (retrievedArticles.data.favoriteArticles.length) {
          setFavArticles(retrievedArticles.data.favoriteArticles);
          sessionStorage.setItem(
            'favorite-articles',
            JSON.stringify(retrievedArticles.data.favoriteArticles)
          );
        }
      }

      if (retrievedArticles.data.readLaterArticles) {
        if (retrievedArticles.data.readLaterArticles.length) {
          setReadLaterArticles(retrievedArticles.data.readLaterArticles);
          sessionStorage.setItem(
            'read-later-articles',
            JSON.stringify(retrievedArticles.data.readLaterArticles)
          );
        }
      }
    };

    if (sessionStorage.getItem(articlesType)) {
      if (articlesType === 'favorite-articles') {
        setFavArticles(JSON.parse(sessionStorage.getItem(articlesType)));
      } else {
        setReadLaterArticles(JSON.parse(sessionStorage.getItem(articlesType)));
      }
    } else {
      fetchArticles();
    }

    setIsLoading(false);
  }, [articlesType, currentUser]);

  return (
    <>
      {isLoading && <h1 style={{ color: 'white' }}>LOADING</h1>}
      <section className={styles.articlesOuterContainer}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.articleNewsHeader}>
            {articlesType === 'favorite-articles' ? 'Favorites' : 'Read later'}
          </h1>
          {articlesType === 'favorite-articles' &&
            favArticles.map((obj) => (
              <ArticleCard
                articleData={obj}
                key={obj.article_id}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}
          {articlesType === 'read-later-articles' &&
            readLaterArticles.map((obj) => (
              <ArticleCard
                articleData={obj}
                key={obj.article_id}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}
        </div>
      </section>
    </>
  );
};
