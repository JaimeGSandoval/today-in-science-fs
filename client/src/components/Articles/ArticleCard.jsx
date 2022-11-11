import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
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
        <div className={styles.cardFooter}>
          <a href={articleData.link} className={styles.cardBtn} target='_blank' rel='noreferrer'>
            Read Article
          </a>

          <div className={styles.iconBox}>
            {isFavorite ? (
              <AiFillStar
                className={styles.fillStar}
                onClick={() => handleToggle(isFavorite, setIsFavorite)}
              />
            ) : (
              <AiOutlineStar
                className={styles.outlineStar}
                onClick={() => handleToggle(isFavorite, setIsFavorite)}
              />
            )}
            {isSaved ? (
              <BsBookmarkFill
                className={styles.bookmarkFill}
                onClick={() => handleToggle(isSaved, setIsSaved)}
              />
            ) : (
              <BsBookmark
                className={styles.bookmarkOutline}
                onClick={() => handleToggle(isSaved, setIsSaved)}
              />
            )}
          </div>
        </div>
        ;
      </div>
    </div>
  );
};
