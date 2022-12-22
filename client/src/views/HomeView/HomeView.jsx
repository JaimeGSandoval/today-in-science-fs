import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { HomeArticlesContainer as Articles } from '../../components/Articles';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Footer } from '../../components/Footer';

export const HomeView = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch('http://localhost:8000/news/initiate');
      const parsedData = await response.json();
      setArticles(parsedData.data.fetchedArticles.value);
      setIsLoading(false);
      sessionStorage.setItem('articles', JSON.stringify(parsedData.data.fetchedArticles.value));
    };

    if (sessionStorage.getItem('articles')) {
      console.log('FROM SESSIONS STORAGE');

      setArticles(JSON.parse(sessionStorage.getItem('articles')));
      setIsLoading(false);
    } else {
      getArticles();
    }
  }, []);

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
