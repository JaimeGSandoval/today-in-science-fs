import React, { useState } from 'react';
import styles from './_articles.module.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';

export const ArticleCard = ({ articleData }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFavoriteToggle = () => setIsFavorite(!isFavorite);
  const handleSavedToggle = () => setIsSaved(!isSaved);

  const articleDate = new Date(articleData.pubDate).toDateString();

  return (
    <div className={styles.articleCard}>
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
              <AiFillStar className={styles.fillStar} onClick={handleFavoriteToggle} />
            ) : (
              <AiOutlineStar className={styles.outlineStar} onClick={handleFavoriteToggle} />
            )}
            {isSaved ? (
              <BsBookmarkFill className={styles.bookmarkFill} onClick={handleSavedToggle} />
            ) : (
              <BsBookmark className={styles.bookmarkOutline} onClick={handleSavedToggle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
