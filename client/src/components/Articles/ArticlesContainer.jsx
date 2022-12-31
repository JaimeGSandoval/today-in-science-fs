import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { useParams } from 'react-router-dom';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';

const NoArticles = () => {
  return (
    <div className={styles.noArticles}>
      <p>No articles saved</p>
    </div>
  );
};

export const ArticlesContainer = () => {
  const { articlesType } = useParams();

  const [favArticles, setFavArticles] = useState([]);
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readLaterAvailable, setReadLaterAvailable] = useState(false);
  const [favsAvailable, setFavsAvailable] = useState(false);

  const { currentUser } = useContext(UserContext);

  sessionStorage.setItem('favorite-articles', JSON.stringify([]));

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
          setFavsAvailable(true);
          sessionStorage.setItem(
            'favorite-articles',
            JSON.stringify(retrievedArticles.data.favoriteArticles)
          );
        }
      }

      if (retrievedArticles.data.readLaterArticles) {
        if (retrievedArticles.data.readLaterArticles.length) {
          setReadLaterArticles(retrievedArticles.data.readLaterArticles);
          setReadLaterAvailable(true);
          sessionStorage.setItem(
            'read-later-articles',
            JSON.stringify(retrievedArticles.data.readLaterArticles)
          );
        }
      }
    };

    const sessionArticles = JSON.parse(sessionStorage.getItem(articlesType));

    if (sessionArticles.length) {
      if (articlesType === 'favorite-articles') {
        setFavArticles(JSON.parse(sessionStorage.getItem(articlesType)));
        setFavsAvailable(true);
      } else {
        setReadLaterArticles(JSON.parse(sessionStorage.getItem(articlesType)));
        setReadLaterAvailable(true);
      }
    } else {
      fetchArticles();
    }

    setIsLoading(false);
  }, [articlesType, currentUser]);

  useEffect(() => {
    sessionStorage.setItem('favorite-articles', JSON.stringify(favArticles));
    if (!favArticles.length) setFavsAvailable(false);
  }, [favArticles]);

  return (
    <>
      <section className={styles.articlesOuterContainer}>
        {isLoading && <h1 style={{ color: 'white' }}>LOADING</h1>}
        <div className={styles.articlesContainer}>
          <h1 className={styles.articleNewsHeader}>
            {articlesType === 'favorite-articles' ? 'Favorites' : 'Read later'}
          </h1>

          {!favsAvailable && articlesType === 'favorite-articles' && <NoArticles />}

          {articlesType === 'favorite-articles' &&
            favArticles.map((obj) => (
              <ArticleCard
                articleData={obj}
                key={obj.article_id}
                type={articlesType}
                setFavArticles={setFavArticles}
              />
            ))}

          {!readLaterAvailable && articlesType === 'read-later-articles' && <NoArticles />}

          {articlesType === 'read-later-articles' &&
            readLaterArticles.map((obj) => (
              <ArticleCard articleData={obj} key={obj.article_id} type={articlesType} />
            ))}
        </div>
      </section>
    </>
  );
};
