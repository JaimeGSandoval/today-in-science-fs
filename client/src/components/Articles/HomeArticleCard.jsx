import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { httpAddArticle, httpDeleteArticle } from '../../api/requests';
import { checkUser } from '../../utils/helpers';
import { IMAGES_WEBP, IMAGES_JPG } from './images';
import styles from './_articles.module.scss';

export const HomeArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  const [addFavArticle, setAddFavArticle] = useState(false);
  const [addReadArticle, setAddReadArticle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;
  const articleDate = new Date(articleData.article.pubDate).toDateString();
  const imageWebp = IMAGES_WEBP.get(articleData.subject);
  const imageJpg = IMAGES_JPG.get(articleData.subject);
  const articleSubject = articleData.subject.replace('-', ' ');

  const favoriteArticleData = {
    userId: currentUser && currentUser.user_id,
    articleTitle: articleData.article.title,
    articleUrl: articleData.article.link,
    articleType: 'favorite',
  };

  const readLaterArticleData = {
    userId: currentUser && currentUser.user_id,
    articleTitle: articleData.article.title,
    articleUrl: articleData.article.link,
    articleType: 'read-later',
  };

  useEffect(() => {
    async function addArticle() {
      checkUser(currentUser, isOpen, setIsOpen);

      const response = await httpAddArticle(favoriteArticleData);
      if (response) {
        return setIsFavorite(true);
      }
    }

    async function deleteArticle() {
      checkUser(currentUser, isOpen, setIsOpen);

      const response = await httpDeleteArticle(favoriteArticleData);
      if (response) {
        return setIsFavorite(false);
      }
    }

    if (addFavArticle) {
      addArticle();
    }

    if (!addFavArticle && isFavorite) {
      deleteArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFavArticle]);

  useEffect(() => {
    async function addArticle() {
      checkUser(currentUser, isOpen, setIsOpen);

      const response = await httpAddArticle(readLaterArticleData);
      if (response) {
        return setIsSaved(true);
      }
    }

    async function deleteArticle() {
      checkUser(currentUser, isOpen, setIsOpen);

      const response = await httpDeleteArticle(readLaterArticleData);
      if (response) {
        return setIsSaved(false);
      }
    }

    if (addReadArticle) {
      addArticle();
    }

    if (!addReadArticle && isSaved) {
      deleteArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addReadArticle]);

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
              <AiFillStar className={styles.fillStar} onClick={() => setAddFavArticle(false)} />
            ) : (
              <AiOutlineStar
                className={styles.outlineStar}
                onClick={() => setAddFavArticle(true)}
              />
            )}
            {isSaved ? (
              <BsBookmarkFill
                className={styles.bookmarkFill}
                onClick={() => setAddReadArticle(false)}
              />
            ) : (
              <BsBookmark
                className={styles.bookmarkOutline}
                onClick={() => setAddReadArticle(true)}
              />
            )}
          </div>
        </div>
        ;
      </div>
    </div>
  );
};
