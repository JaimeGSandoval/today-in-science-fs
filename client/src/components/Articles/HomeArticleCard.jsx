import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/User.context';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { httpAddArticle, httpDeleteArticle } from '../../api/requests';
import { checkUser } from '../../utils/helpers';
import { IMAGES_WEBP, IMAGES_JPG } from './images';
import styles from './_articles.module.scss';

export const HomeArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  console.log('ARTICLE DATA', articleData);
  console.log(articleData.image.thumbnail.contentUrl);
  const [addFavArticle, setAddFavArticle] = useState(false);
  const [addReadArticle, setAddReadArticle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;
  const articleDate = new Date(articleData.datePublished).toDateString();
  const imageWebp = IMAGES_WEBP.get(articleData.subject);
  const imageJpg = IMAGES_JPG.get(articleData.subject);
  const articleProvider = articleData.provider[0].name;
  const image = articleData.image.thumbnail.contentUrl;

  const favoriteArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.name,
      articleUrl: articleData.url,
      articleType: 'favorite',
    }),
    [articleData.url, articleData.name, currentUser]
  );

  const readLaterArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.name,
      articleUrl: articleData.url,
      articleType: 'read-later',
    }),
    [articleData.url, articleData.name, currentUser]
  );

  const addArticle = useCallback(
    async (type) => {
      checkUser(currentUser, isOpen, setIsOpen);

      if (type === 'favorite') {
        const response = await httpAddArticle(favoriteArticleData);
        if (response) {
          return setIsFavorite(true);
        }
      }

      const response = await httpAddArticle(readLaterArticleData);
      if (response) {
        return setIsSaved(true);
      }
    },
    [currentUser, isOpen, setIsOpen, favoriteArticleData, readLaterArticleData]
  );

  const deleteArticle = useCallback(
    async (type) => {
      checkUser(currentUser, isOpen, setIsOpen);

      if (type === 'favorite') {
        const response = await httpDeleteArticle(favoriteArticleData);
        if (response) {
          return setIsFavorite(false);
        }
      }

      const response = await httpDeleteArticle(readLaterArticleData);
      if (response) {
        return setIsSaved(false);
      }
    },
    [currentUser, isOpen, setIsOpen, favoriteArticleData, readLaterArticleData]
  );

  useEffect(() => {
    if (addFavArticle) {
      addArticle('favorite');
    }

    if (!addFavArticle && isFavorite) {
      deleteArticle('favorite');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFavArticle, addArticle, deleteArticle]);

  useEffect(() => {
    if (addReadArticle) {
      addArticle('read-later');
    }

    if (!addReadArticle && isSaved) {
      deleteArticle('read-later');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addReadArticle, addArticle, deleteArticle]);

  return (
    <div className={styles.articleCard}>
      <picture>
        {/* <source srcSet={imageWebp} /> */}
        {/* <img className={styles.cardImg} src={image} alt='' /> */}
      </picture>
      <div className={styles.cardBody}>
        <span className={styles.cardProvider}>{articleProvider}</span>
        {/* <Link to={`/articles/${articleData.subject}`} className={styles.cardHeader}>
          {articleSubject}
        </Link> */}
        <h3 className={styles.cardTitle}>{articleData.name}</h3>
        <p className={styles.cardText}>{articleData.description}</p>
        <span className={styles.cardDate}>{articleDate}</span>
        <div className={styles.cardFooter}>
          <a href={articleData.url} className={styles.cardBtn} target='_blank' rel='noreferrer'>
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
