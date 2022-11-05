import React from 'react';
import { HeaderLogo } from '../../components/HeaderLogo';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Footer } from '../../components/Footer';
import { ArticlesContainer as Articles } from '../../components/Articles';

export const ArticlesView = () => {
  return (
    <>
      <HeaderLogo />
      <Articles />
      <ScrollToTop />
      <Footer />
    </>
  );
};
