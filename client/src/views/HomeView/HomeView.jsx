import React, { useState, useEffect, useContext } from 'react';
import { Hero } from '../../components/Hero';
import { HomeArticlesContainer as Articles } from '../../components/Articles';
import { ScrollToTop } from '../../components/ScrollToTop';
import { UserContext } from '../../context/User.context';
import styles from './_homeView.module.scss';

export const HomeView = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    let options;
    let user = localStorage.getItem('currentUser');
    let ignore = false;

    const checkAuth = async () => {
      // '/api/auth/checkExpiredCookie'
      try {
        const response = await fetch('http://localhost:3001/api/auth/checkExpiredCookie', {
          credentials: 'include',
        });

        const validCookie = await response.json();

        if (!validCookie.expired) {
          options = user
            ? {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                body: user,
              }
            : {};
        } else {
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } catch (e) {
        setHttpError(true);
        console.error(e);
      }
    };

    const getArticles = async () => {
      try {
        if (!ignore) {
          await checkAuth();
          // '/api/news/initiate'

          const response = await fetch('http://localhost:3001/api/news/initiate', options);
          if (!response.ok) {
            throw new Error('Error retrieving data');
          }

          const parsedData = await response.json();
          setArticles(parsedData.data.finalArticles);
          setIsLoading(false);

          sessionStorage.setItem('articles', JSON.stringify(parsedData.data.finalArticles));
        }
      } catch (e) {
        setHttpError(true);
        console.error(e);
      }
    };

    getArticles();

    return () => {
      ignore = true;
      setHttpError(false);
    };
  }, [setCurrentUser]);

  let heroArticle;
  if (!isLoading) heroArticle = articles[0];

  return (
    <>
      {!httpError && <Hero heroArticle={heroArticle} isLoading={isLoading} />}
      {httpError && (
        <div className={styles.errorTextBox}>
          <h1 className={styles.errorText}>Error retrieving articles. Please try again.</h1>
        </div>
      )}
      {!httpError && <Articles articles={articles.slice(1)} isLoading={isLoading} />}
      <ScrollToTop />
    </>
  );
};
