import React from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { Articles } from '../../components/Articles';
import { Footer } from '../../components/Footer';
import './_home.module.scss';

export const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Articles />
      <Footer />
    </>
  );
};
