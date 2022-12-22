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
      setArticles(parsedData.data.fetchedArticles.value);
      setIsLoading(false);

      // const { data } = parsedData;

      // loop through home articles and all articles and give each a fav and saved prop set to false
      // when user clicks fav star, make request to DB.
      // upon successful response, loop through home articles and all articles and find articles by title. set the fav or saved property to true
      // store back in session storage
      // when rendering out, if fav === true, set fill star, else empty star

      // allArticles -> an array of objects Each obj has an articles property that's an array of 10 objects Each of these objects is an article
      // const test = [];
      // data.allArticles.forEach((a) => {
      //   a.articles[0].favorite = false;
      //   a.articles[0].saved = false;
      //   test.push(a.articles[0]);
      // });

      // console.log(test);

      //   setArticles(data.homeArticles);

      //   setIsLoading(false);
      //   sessionStorage.setItem('home-articles', JSON.stringify(data.homeArticles));

      //   data.allArticles.forEach((a) => {
      //     // a.articles.forEach((el) => {
      //     //   el.favorite = false;
      //     //   el.saved = false;
      //     // });

      //     sessionStorage.setItem(a.subject, JSON.stringify(a.articles));
      //   });
      // };

      // if (sessionStorage.getItem('home-articles')) {
      //   console.log('FROM SESSIONS STORAGE');

      //   setArticles(JSON.parse(sessionStorage.getItem('home-articles')));
      //   setIsLoading(false);
      // } else {
      //   getHomeArticles();
    };

    getHomeArticles();
  }, []);

  let heroArticle;
  if (!isLoading) heroArticle = articles[0];
  // console.log(articles);

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
