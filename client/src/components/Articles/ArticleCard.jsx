import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/User.context';
import { httpDeleteArticle } from '../../api/requests';
import { BsTrash } from 'react-icons/bs';
import styles from './_articles.module.scss';

export const ArticleCard = ({ articleData, type, setFavArticles, setReadLaterArticles }) => {
  const [isSaved, setIsSaved] = useState(true);
  const currentUserContext = useContext(UserContext);
  const { currentUser } = currentUserContext;

  const favoriteArticleData = useMemo(
    () => ({
      articleTitle: articleData.article_title,
      userId: currentUser.user_id,
      articleType: 'favorite',
    }),
    [articleData.article_title, currentUser.user_id]
  );

  const readLaterArticleData = useMemo(
    () => ({
      articleTitle: articleData.article_title,
      userId: currentUser.user_id,
      articleType: 'read-later',
    }),
    [articleData.article_title, currentUser.user_id]
  );

  const deleteArticle = useCallback(
    async (articleType) => {
      const errMessage = 'Error: could not delete article';

      if (articleType === 'favorite-articles') {
        try {
          const response = await httpDeleteArticle(favoriteArticleData);

          if (!response) {
            throw new Error(errMessage);
          }

          return true;
        } catch (e) {
          console.error(e.message);
        }
      } else {
        try {
          const response = await httpDeleteArticle(readLaterArticleData);

          if (!response) {
            throw new Error(errMessage);
          }

          return true;
        } catch (e) {
          console.error(e.message);
        }
      }
    },
    [favoriteArticleData, readLaterArticleData]
  );

  const articleSetter = useCallback(
    async (articleType, articleData, deleteFn) => {
      let sessionArticles, updatedArticles, homeArticles, updatedHomeArticles;

      const isDeleted = await deleteFn(articleType, articleData);

      if (isDeleted) {
        sessionArticles = JSON.parse(sessionStorage.getItem(articleType));
        updatedArticles = sessionArticles.filter(
          (a) => a.article_title !== articleData.articleTitle
        );

        homeArticles = JSON.parse(sessionStorage.getItem('articles'));
        updatedHomeArticles = homeArticles.map((a) => {
          if (a.name === articleData.articleTitle) {
            if (articleType === 'favorite-articles') {
              a.isFavorite = false;
            } else {
              a.isReadLater = false;
            }
          }

          return a;
        });

        sessionStorage.setItem(articleType, JSON.stringify(updatedArticles));
        sessionStorage.setItem('articles', JSON.stringify(updatedHomeArticles));

        if (articleType === 'favorite-articles') {
          setFavArticles(updatedArticles);
        } else {
          setReadLaterArticles(updatedArticles);
        }
      }
    },
    [setFavArticles, setReadLaterArticles]
  );

  useEffect(() => {
    const removeUserArticle = async () => {
      if (!isSaved && type === 'favorite-articles') {
        await articleSetter(type, favoriteArticleData, deleteArticle);
      } else if (!isSaved) {
        await articleSetter(type, readLaterArticleData, deleteArticle);
      }
    };

    removeUserArticle();
  }, [
    isSaved,
    deleteArticle,
    type,
    articleData.articleTitle,
    favoriteArticleData,
    setFavArticles,
    readLaterArticleData,
    setReadLaterArticles,
    articleSetter,
  ]);

  const articleDate = new Date(articleData.date_added).toDateString();

  return (
    <div className={styles.articlesViewCard}>
      <div className={styles.cardBody}>
        <a href='/' className={styles.cardHeader}>
          {articleData.provider}
        </a>
        <h3 href='/' className={styles.cardTitle}>
          {articleData.article_title}
        </h3>
        <p className={styles.cardText}>{articleData.content}</p>
        <span className={styles.cardDate}>{articleDate}</span>
        <div className={styles.cardFooter}>
          <a
            href={articleData.article_url}
            className={styles.cardBtn}
            target='_blank'
            rel='noreferrer'
          >
            Read Article
          </a>

          <div className={styles.iconBox}>
            <BsTrash className={styles.trashIcon} onClick={() => setIsSaved(false)} />
          </div>
        </div>
        ;
      </div>
    </div>
  );
};
