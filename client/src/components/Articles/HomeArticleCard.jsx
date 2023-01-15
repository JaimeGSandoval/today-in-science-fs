import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/User.context';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { httpAddArticle, httpDeleteArticle } from '../../api/requests';
import { checkUser, updateSessionStorage } from '../../utils/helpers';
import styles from './_articles.module.scss';

export const HomeArticleCard = ({ articleData, isOpen, setIsOpen }) => {
  const [addFavArticle, setAddFavArticle] = useState(false);
  const [addReadArticle, setAddReadArticle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReadLater, setIsReadLater] = useState(false);
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
      const sessionArticles = JSON.parse(sessionStorage.getItem('articles'));
      let updatedArticles;
      const isLoggedIn = checkUser(currentUser, isOpen, setIsOpen);

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
          updatedArticles = updateSessionStorage(
            type,
            sessionArticles,
            favoriteArticleData.articleTitle,
            true
          );

          sessionStorage.setItem('articles', JSON.stringify(updatedArticles));

          return setIsFavorite(true);
        }
      }

      const response = await httpAddArticle(readLaterArticleData);

      if (response.ok) {
        updatedArticles = updateSessionStorage(
          type,
          sessionArticles,
          readLaterArticleData.articleTitle,
          true
        );

        sessionStorage.setItem('articles', JSON.stringify(updatedArticles));

        return setIsReadLater(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, favoriteArticleData, readLaterArticleData]
  );

  const deleteArticle = useCallback(
    async (type) => {
      checkUser(currentUser, isOpen, setIsOpen);

      const sessionArticles = JSON.parse(sessionStorage.getItem('articles'));
      let updatedArticles;

      if (type === 'favorite') {
        const response = await httpDeleteArticle(favoriteArticleData);

        if (response) {
          updatedArticles = updateSessionStorage(
            type,
            sessionArticles,
            favoriteArticleData.articleTitle,
            false
          );

          sessionStorage.setItem('articles', JSON.stringify(updatedArticles));

          return setIsFavorite(false);
        }
      }

      const response = await httpDeleteArticle(readLaterArticleData);

      if (response) {
        updatedArticles = updateSessionStorage(
          type,
          sessionArticles,
          readLaterArticleData.articleTitle,
          false
        );

        sessionStorage.setItem('articles', JSON.stringify(updatedArticles));
        return setIsReadLater(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, favoriteArticleData, readLaterArticleData]
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
