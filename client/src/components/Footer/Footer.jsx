import React from 'react';
import FooterLink from './FooterLink';
import styles from './_footer.module.scss';

const SUBJECTS_ONE = [
  'Artificial Intelligence',
  'Ancient Civilizations',
  'Astronomy',
  'Big Bang',
  'Energy Technology',
];

const SUBJECTS_TWO = ['Mathematics', 'Neural Interfaces', 'Neuroscience', 'Quantum Computers'];

const RESOURCES_ONE = [
  {
    url: 'https://www.space.com/',
    name: 'SPACE.COM',
  },
  {
    url: 'https://phys.org/',
    name: 'PHYS.ORG',
  },
  {
    url: 'https://www.sciencedaily.com/',
    name: 'SCIENCEDAILY.COM',
  },
  {
    url: 'https://www.livescience.com/',
    name: 'LIVESCIENCE.COM',
  },
];

const RESOURCES_TWO = [
  {
    url: 'https://www.spacex.com/',
    name: 'SPACEX.COM',
  },
  {
    url: 'https://www.scientificamerican.com/',
    name: 'SCIENTIFICAMERICAN.COM',
  },
  {
    url: 'https://www.popsci.com/',
    name: 'POPSCI.COM',
  },
  {
    url: 'https://www.nasa.gov/',
    name: 'NASA.GOV',
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.headline}>More Resources</h1>
        <nav className={styles.nav}>
          <div className={styles.linkBox}>
            <ul>
              {RESOURCES_ONE.map((resource) => (
                <FooterLink resource={resource} styles={styles.navLink} key={resource.name} />
              ))}
            </ul>
          </div>

          <div className={styles.linkBox}>
            <ul>
              {RESOURCES_TWO.map((resource) => (
                <FooterLink resource={resource} styles={styles.navLink} key={resource.name} />
              ))}
            </ul>
          </div>
        </nav>

        <div className={styles.logoBox}>
          <span className={styles.logo}>TODAY IN SCIENCE</span>
        </div>
      </div>
    </footer>
  );
};
