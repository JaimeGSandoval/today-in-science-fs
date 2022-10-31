import React from 'react';

const NavLink = ({ subject, styles }) => {
  return (
    <li>
      <a className={styles} href='/'>
        {subject}
      </a>
    </li>
  );
};

export default NavLink;
