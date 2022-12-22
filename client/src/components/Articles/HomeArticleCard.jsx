import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/User.context';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { httpAddArticle, httpDeleteArticle } from '../../api/requests';
import { checkUser } from '../../utils/helpers';
import styles from './_articles.module.scss';

export const HomeArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  const [addFavArticle, setAddFavArticle] = useState(false);
  const [addReadArticle, setAddReadArticle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;
  const articleDate = new Date(articleData.datePublished).toDateString();
  const articleProvider = articleData.provider[0].name;

  const favoriteArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.name,
      articleUrl: articleData.url,
      provider: articleData.provider[0].name,
      articleType: 'favorite',
    }),
    [articleData.url, articleData.name, articleData.provider, currentUser]
  );

  const readLaterArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.name,
      articleUrl: articleData.url,
      provider: articleData.provider[0].name,
      articleType: 'read-later',
    }),
    [articleData.url, articleData.name, articleData.provider, currentUser]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, favoriteArticleData, readLaterArticleData]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, favoriteArticleData, readLaterArticleData]
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
      <div className={styles.cardBody}>
        <span className={styles.cardProvider}>{articleProvider}</span>
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
