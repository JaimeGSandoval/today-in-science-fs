import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { HomeArticlesContainer as Articles } from '../../components/Articles';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Footer } from '../../components/Footer';
import { UserContext } from '../../context/User.context';

export const HomeView = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    let options;
    let user = localStorage.getItem('currentUser');

    const checkAuth = async () => {
      const response = await fetch('http://localhost:8000/auth/checkExpiredCookie', {
        credentials: 'include',
      });

      if (response.ok) {
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
        console.log('COOKIE BE GONE');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    };

    checkAuth();

    const getArticles = async () => {
      const response = await fetch('http://localhost:8000/news/initiate', options);

      const parsedData = await response.json();
      setArticles(parsedData.data.fetchedArticles.value);
      setIsLoading(false);
      // sessionStorage.setItem('articles', JSON.stringify(parsedData.data.fetchedArticles.value));
    };

    if (sessionStorage.getItem('articles')) {
      setArticles(JSON.parse(sessionStorage.getItem('articles')));
      setIsLoading(false);
    } else {
      getArticles();
    }
  }, [setCurrentUser]);

  let heroArticle;
  if (!isLoading) heroArticle = articles[0];

  return (
    <>
      <Header />
      <Hero heroArticle={heroArticle} isLoading={isLoading} />
      <Articles articles={articles.slice(1)} isLoading={isLoading} />
      <ScrollToTop />
      <Footer />
    </>
  );
};
