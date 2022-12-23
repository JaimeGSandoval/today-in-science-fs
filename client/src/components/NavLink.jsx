import React from 'react';
import { Link } from 'react-router-dom';

export const NavLink = ({ setIsOpen, styles, linkData }) => {
  return (
    <li>
      <Link to={linkData.route} className={styles} onClick={() => setIsOpen(false)}>
        {linkData.text}
      </Link>
    </li>
  );
};
