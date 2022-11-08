import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './_articles.module.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import IMAGES_WEBP from './images';

export const HomeArticleCard = ({ articleData }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFavoriteToggle = () => setIsFavorite(!isFavorite);
  const handleSavedToggle = () => setIsSaved(!isSaved);

  const articleDate = new Date(articleData.article.pubDate).toDateString();
  const image = IMAGES_WEBP.get(articleData.subject);
  const articleSubject = articleData.subject.replace('-', ' ');

  return (
    <div className={styles.articleCard}>
      <img className={styles.cardImg} src={image} alt='' />
      <div className={styles.cardBody}>
        <Link to={`/articles/${articleData.subject}`} className={styles.cardHeader}>
          {articleSubject}
        </Link>

        <h3 className={styles.cardTitle}>{articleData.article.title}</h3>

        <p className={styles.cardText}>{articleData.article.content}</p>

        <span className={styles.cardDate}>{articleDate}</span>

        <div className={styles.cardFooter}>
          <a
            href={articleData.article.link}
            className={styles.cardBtn}
            target='_blank'
            rel='noreferrer'
          >
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
