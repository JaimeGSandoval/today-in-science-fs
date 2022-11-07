import React from 'react';
import { useParams } from 'react-router-dom';
import { HeaderLogo } from '../../components/HeaderLogo';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Footer } from '../../components/Footer';
import { ArticlesContainer as Articles } from '../../components/Articles';

export const ArticlesView = () => {
  const { subject } = useParams();
  const articles = JSON.parse(sessionStorage.getItem(subject));
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderLogo />
      <Articles articles={articles} subject={subject} />
      <ScrollToTop />
      <Footer />
    </>
  );
};
