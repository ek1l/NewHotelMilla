import { useEffect } from 'react';
import SectionHome5 from '../../Components/SectionHome5/SectionHome5';
import SectionNews1 from '../../Components/SectionNews1/SectionNews1';

import SectionNews2 from '../../Components/SectionNews2/SectionNews2';
import styles from './News.module.scss';
const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.main}>
      <SectionNews1 />
      <SectionNews2 />
      <SectionHome5 />
    </main>
  );
};

export default News;
