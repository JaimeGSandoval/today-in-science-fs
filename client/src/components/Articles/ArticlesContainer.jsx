import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { useParams } from 'react-router-dom';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';

export const ArticlesContainer = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { articlesType } = useParams();
  console.log(articlesType);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(
        `http://localhost:8000/articles/${articlesType}/${currentUser.user_id}`,
        {
          credentials: 'include',
        }
      );
      const retrievedArticles = await response.json();

      if (articlesType === 'favorite-articles') {
        sessionStorage.setItem(
          articlesType,
          JSON.stringify(retrievedArticles.data.favoriteArticles)
        );
        setArticles(retrievedArticles.data.favoriteArticles);
      } else {
        sessionStorage.setItem(
          articlesType,
          JSON.stringify(retrievedArticles.data.readLaterArticles)
        );
        setArticles(retrievedArticles.data.readLaterArticles);
      }
    };

    if (sessionStorage.getItem(articlesType)) {
      const storedArticles = JSON.parse(sessionStorage.getItem(articlesType));
      setArticles(storedArticles);
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
          {articles.map((obj) => (
            <ArticleCard articleData={obj} key={obj.title} setIsOpen={setIsOpen} isOpen={isOpen} />
          ))}
        </div>
      </section>
    </>
  );
};
