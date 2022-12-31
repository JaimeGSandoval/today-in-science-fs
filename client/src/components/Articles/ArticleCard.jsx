import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/User.context';
import { httpDeleteArticle } from '../../api/requests';
import { BsTrash } from 'react-icons/bs';
import styles from './_articles.module.scss';

export const ArticleCard = ({ articleData, type, setFavArticles }) => {
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

  const readLaterArticleData = {
    articleTitle: articleData.article_title,
    userId: currentUser.user_id,
    articleType: 'read-later',
  };

  const deleteArticle = useCallback(
    async (articleType) => {
      if (articleType === 'favorite-articles') {
        const response = await httpDeleteArticle(favoriteArticleData);
        console.log(response);
      }
    },
    [favoriteArticleData]
  );

  useEffect(() => {
    if (!isSaved) {
      deleteArticle(type, favoriteArticleData);
      const sessionArticles = JSON.parse(sessionStorage.getItem('favorite-articles'));
      const updatedArticles = sessionArticles.filter(
        (a) => a.article_title !== favoriteArticleData.articleTitle
      );

      const homeArticles = JSON.parse(sessionStorage.getItem('articles'));
      const updatedHomeArticles = homeArticles.map((a) => {
        if (a.article_title !== favoriteArticleData.articleTitle) {
          a.isFavorite = false;
        }

        return a;
      });

      sessionStorage.setItem('favorite-articles', JSON.stringify(updatedArticles));
      sessionStorage.setItem('articles', JSON.stringify(updatedHomeArticles));
      setFavArticles(updatedArticles);
    }
  }, [isSaved, deleteArticle, type, favoriteArticleData, setFavArticles, articleData.articleTitle]);

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
