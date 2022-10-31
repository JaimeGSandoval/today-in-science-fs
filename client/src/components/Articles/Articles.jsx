import React from 'react';
import styles from './_articles.module.scss';
import { ArticleCard } from './ArticleCard';

const mockData = [
  {
    subject: 'Quantum Computers',
    title: 'New form of universal quantum computers',
    text: `Computing power of quantum machines is currently still very low. Increasing it is still
        proving to be a major challenge. Physicists now present a new architecture for a universal
        quantum computer that overcomes such limitations and could be the basis of the next
        generation of quantum computers soon.`,
    date: 'Fri, 28 Oct 2022',
    link: 'https://www.sciencedaily.com/releases/2022/10/221028111540.htm',
  },
  {
    subject: 'Quantum Computers',
    title: 'New hybrid structures could pave the way to more stable quantum computers',
    text: `A new way to combine two materials with special electrical properties -- a monolayer superconductor and a topological insulator -- provides the best platform to date to explore an unusual form of superconductivity called topological superconductivity. The combination could provide the basis for topological quantum computers that are more stable than their traditional counterparts..`,
    date: 'Fri, 27 Oct 2022',
    link: 'https://www.sciencedaily.com/releases/2022/10/221027123929.htm',
  },
  {
    subject: 'Quantum Computers',
    title: 'Miniaturized infrared detectors',
    text: `Extreme miniaturization of infrared (IR) detectors is critical for their integration into next-generation consumer electronics, wearables and ultra-small satellites. Thus far, however, IR detectors have relied on bulky (and expensive) materials and technologies. A team of scientists has now succeeded in developing a cost-effective miniaturization process for IR spectrometers based on a quantum dot photodetector, which can be integrated on a single chip.`,
    date: 'Fri, 28 Oct 2022',
    link: 'https://www.sciencedaily.com/releases/2022/10/221025112549.htm',
  },
];

export const Articles = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.newsHeader}>Latest Articles</h1>
          {mockData.map((obj) => (
            <ArticleCard articleData={obj} key={obj.title} />
          ))}
        </div>
      </section>
    </>
  );
};
