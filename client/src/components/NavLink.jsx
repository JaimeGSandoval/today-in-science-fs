import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ subject, styles, setIsOpen }) => {
  const subjectNoDash = subject.replace('-', ' ');
  return (
    <li>
      <Link className={styles} to={`/articles/${subject}`} onClick={() => setIsOpen(false)}>
        {subjectNoDash}
      </Link>
    </li>
  );
};

export default NavLink;
