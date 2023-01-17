import React from 'react';
import { useParams } from 'react-router-dom';
import { ScrollToTop } from '../../components/ScrollToTop';
import { ArticlesContainer as Articles } from '../../components/Articles';

export const ArticlesView = () => {
  const { subject } = useParams();
  const articles = JSON.parse(sessionStorage.getItem(subject));
  window.scrollTo(0, 0);

  return (
    <>
      <Articles articles={articles} subject={subject} />
      <ScrollToTop />
    </>
  );
};
