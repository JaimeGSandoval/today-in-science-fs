import React from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { HomeArticlesContainer as Articles } from '../../components/Articles';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Footer } from '../../components/Footer';

export const HomeView = () => {
  return (
    <>
      <Header />
      <Hero />
      <Articles />
      <ScrollToTop />
      <Footer />
    </>
  );
};
