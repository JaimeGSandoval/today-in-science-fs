import React, { useState } from 'react';
import defaultStyles from './_headerLogo.module.scss';
import { Link } from 'react-router-dom';
import { MobileNavMenu, MobileNavBtn } from '../MobileNav';
import { GiAtom } from 'react-icons/gi';

export const HeaderLogo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className={defaultStyles.headerContainer}>
        <div className={defaultStyles.innerContainer}>
          <div className={defaultStyles.logoBox}>
            <GiAtom className={defaultStyles.logoIcon} />
            <Link to='/' className={defaultStyles.logoText}>
              TODAY IN SCIENCE
            </Link>
          </div>
          <MobileNavBtn setFn={setIsOpen} />
        </div>
      </div>
      <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
