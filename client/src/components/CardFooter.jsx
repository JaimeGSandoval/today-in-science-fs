import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';

export const CardFooter = ({ cardFooterData }) => {
  const { articleData, handleToggle, isFavorite, setIsFavorite, isSaved, setIsSaved, styles } =
    cardFooterData;

  return (
    <div className={styles.cardFooter}>
      <a href={articleData.link} className={styles.cardBtn} target='_blank' rel='noreferrer'>
        Read Article
      </a>

      <div className={styles.iconBox}>
        {isFavorite ? (
          <AiFillStar
            className={styles.fillStar}
            onClick={() => handleToggle(isFavorite, setIsFavorite)}
          />
        ) : (
          <AiOutlineStar
            className={styles.outlineStar}
            onClick={() => handleToggle(isFavorite, setIsFavorite)}
          />
        )}
        {isSaved ? (
          <BsBookmarkFill
            className={styles.bookmarkFill}
            onClick={() => handleToggle(isSaved, setIsSaved)}
          />
        ) : (
          <BsBookmark
            className={styles.bookmarkOutline}
            onClick={() => handleToggle(isSaved, setIsSaved)}
          />
        )}
      </div>
    </div>
  );
};
