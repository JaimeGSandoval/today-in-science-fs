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
  const [isReadLater, setIsReadLater] = useState(false);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;
  const articleDate = new Date(articleData.pubDate).toDateString();
  const articleProvider = articleData.source;

  const favoriteArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.title,
      articleUrl: articleData.link,
      provider: articleData.source,
      articleType: 'favorite',
    }),
    [articleData.link, articleData.title, articleData.source, currentUser]
  );

  const readLaterArticleData = useMemo(
    () => ({
      userId: currentUser && currentUser.user_id,
      articleTitle: articleData.title,
      articleUrl: articleData.link,
      provider: articleData.source,
      articleType: 'read-later',
    }),
    [articleData.link, articleData.title, articleData.source, currentUser]
  );

  const addArticle = useCallback(
    async (type) => {
      const isLoggedIn = checkUser(currentUser, setIsOpen);

      if (!isLoggedIn) {
        if (type === 'favorite') {
          setAddFavArticle(false);
        } else {
          setAddReadArticle(false);
        }

        setIsOpen(true);
        return;
      }

      if (type === 'favorite') {
        const response = await httpAddArticle(favoriteArticleData);

        if (response.ok) {
          return setIsFavorite(true);
        }
      }

      const response = await httpAddArticle(readLaterArticleData);

      if (response.ok) {
        return setIsReadLater(true);
      }
    },

    [currentUser, favoriteArticleData, readLaterArticleData, setIsOpen]
  );

  const deleteArticle = useCallback(
    async (type) => {
      checkUser(currentUser, setIsOpen);

      if (type === 'favorite') {
        const response = await httpDeleteArticle(favoriteArticleData);

        if (response) {
          return setIsFavorite(false);
        }
      }

      const response = await httpDeleteArticle(readLaterArticleData);

      if (response) {
        return setIsReadLater(false);
      }
    },

    [currentUser, favoriteArticleData, readLaterArticleData, setIsOpen]
  );

  useEffect(() => {
    if (articleData.isFavorite) {
      setIsFavorite(true);
      setAddFavArticle(true);
    }

    if (articleData.isReadLater) {
      setIsReadLater(true);
      setAddReadArticle(true);
    }
  }, [articleData.isFavorite, articleData.isReadLater]);

  useEffect(() => {
    if (addFavArticle && !isFavorite) {
      addArticle('favorite');
    }

    if (!addFavArticle && isFavorite) {
      deleteArticle('favorite');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFavArticle, addArticle, deleteArticle]);

  useEffect(() => {
    if (addReadArticle && !isReadLater) {
      addArticle('read-later');
    }

    if (!addReadArticle && isReadLater) {
      deleteArticle('read-later');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addReadArticle, addArticle, deleteArticle]);

  return (
    <div className={styles.articleCard}>
      <div className={styles.cardBody}>
        <span className={styles.cardProvider}>{articleProvider}</span>
        <h3 className={styles.cardTitle}>{articleData.title}</h3>
        <p className={styles.cardText}>{articleData.description}</p>
        <span className={styles.cardDate}>{articleDate}</span>
        <div className={styles.cardFooter}>
          <a href={articleData.link} className={styles.cardBtn} target='_blank' rel='noreferrer'>
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
            {isReadLater ? (
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
