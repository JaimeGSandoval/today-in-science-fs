import React from 'react';
// import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { Articles } from '../../components/Articles';
import './_home.module.scss';

export const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <Articles />
    </>
  );
};
