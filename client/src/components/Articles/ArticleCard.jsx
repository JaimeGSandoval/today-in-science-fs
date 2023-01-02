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
      if (articleType === 'favorite-articles') {
        const response = await httpDeleteArticle(favoriteArticleData);
        console.log('FAV', response);
      } else {
        const response = await httpDeleteArticle(readLaterArticleData);
        console.log('READ', response);
      }
    },
    [favoriteArticleData, readLaterArticleData]
  );

  useEffect(() => {
    let sessionArticles, updatedArticles, homeArticles, updatedHomeArticles;

    if (!isSaved && type === 'favorite-articles') {
      deleteArticle(type, favoriteArticleData);
      sessionArticles = JSON.parse(sessionStorage.getItem('favorite-articles'));
      updatedArticles = sessionArticles.filter(
        (a) => a.article_title !== favoriteArticleData.articleTitle
      );

      homeArticles = JSON.parse(sessionStorage.getItem('articles'));
      updatedHomeArticles = homeArticles.map((a) => {
        if (a.name === favoriteArticleData.articleTitle) {
          a.isFavorite = false;
        }

        return a;
      });

      console.log('UPDATED', updatedHomeArticles);

      sessionStorage.setItem('favorite-articles', JSON.stringify(updatedArticles));
      sessionStorage.setItem('articles', JSON.stringify(updatedHomeArticles));

      setFavArticles(updatedArticles);
    }

    if (!isSaved && type === 'read-later-articles') {
      deleteArticle(type, readLaterArticleData);
      sessionArticles = JSON.parse(sessionStorage.getItem('read-later-articles'));
      updatedArticles = sessionArticles.filter(
        (a) => a.article_title !== readLaterArticleData.articleTitle
      );

      homeArticles = JSON.parse(sessionStorage.getItem('articles'));
      updatedHomeArticles = homeArticles.map((a) => {
        if (a.name === readLaterArticleData.articleTitle) {
          a.isReadLater = false;
        }

        return a;
      });

      sessionStorage.setItem('read-later-articles', JSON.stringify(updatedArticles));
      sessionStorage.setItem('articles', JSON.stringify(updatedHomeArticles));

      setReadLaterArticles(updatedArticles);
    }
  }, [
    isSaved,
    deleteArticle,
    type,
    favoriteArticleData,
    setFavArticles,
    articleData.articleTitle,
    readLaterArticleData,
    setReadLaterArticles,
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
