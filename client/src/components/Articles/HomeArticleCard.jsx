import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { IMAGES_WEBP, IMAGES_JPG } from './images';
import styles from './_articles.module.scss';

export const HomeArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      setIsOpen(!isOpen);
      return;
    }

    setIsFavorite(!isFavorite);
  };

  const handleSavedToggle = () => setIsSaved(!isSaved);

  const articleDate = new Date(articleData.article.pubDate).toDateString();
  const imageWebp = IMAGES_WEBP.get(articleData.subject);
  const imageJpg = IMAGES_JPG.get(articleData.subject);
  const articleSubject = articleData.subject.replace('-', ' ');

  return (
    <div className={styles.articleCard}>
      <picture>
        <source srcSet={imageWebp} />
        <img className={styles.cardImg} src={imageJpg} alt='' />
      </picture>
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
