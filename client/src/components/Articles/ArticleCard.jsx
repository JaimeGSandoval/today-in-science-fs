import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { CardFooter } from '../CardFooter';
import styles from './_articles.module.scss';

export const ArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  const handleToggle = (stateVal, setStateVal) => {
    if (!currentUser) {
      setIsOpen(!isOpen);
      return;
    }

    setStateVal(!stateVal);
  };

  const articleDate = new Date(articleData.pubDate).toDateString();

  const cardFooterData = {
    articleData,
    handleToggle,
    isFavorite,
    setIsFavorite,
    isSaved,
    setIsSaved,
    styles,
  };

  return (
    <div className={styles.articlesViewCard}>
      <div className={styles.cardBody}>
        <a href='/' className={styles.cardHeader}>
          {articleData.subject}
        </a>

        <h3 href='/' className={styles.cardTitle}>
          {articleData.title}
        </h3>

        <p className={styles.cardText}>{articleData.content}</p>

        <span className={styles.cardDate}>{articleDate}</span>
        <CardFooter cardFooterData={cardFooterData} />
      </div>
    </div>
  );
};
