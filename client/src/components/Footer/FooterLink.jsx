import React from 'react';

const FooterLink = ({ resource, styles }) => {
  return (
    <li>
      <a href={resource.url} className={styles} target='_blank' rel='noreferrer'>
        {resource.name}
      </a>
    </li>
  );
};

export default FooterLink;
