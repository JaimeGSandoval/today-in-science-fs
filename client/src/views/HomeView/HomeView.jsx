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
    const getHomeArticles = async () => {
      const response = await fetch('http://localhost:8000/news/initiate');
      const parsedData = await response.json();
      const { data } = parsedData;
      setArticles(data.homeArticles);
      setIsLoading(false);
      sessionStorage.setItem('home-articles', JSON.stringify(data.homeArticles));
      data.allArticles.forEach((a) =>
        sessionStorage.setItem(a.subject, JSON.stringify(a.articles))
      );
    };

    if (sessionStorage.getItem('home-articles')) {
      setArticles(JSON.parse(sessionStorage.getItem('home-articles')));
      setIsLoading(false);
    } else {
      getHomeArticles();
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
