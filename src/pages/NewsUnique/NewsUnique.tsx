import { useEffect } from 'react';
import SectionHome4 from '../../Components/SectionHome4/SectionHome4';
import SectionHome5 from '../../Components/SectionHome5/SectionHome5';
import SectionHome6 from '../../Components/SectionHome6/SectionHome6';
import SectionHome7 from '../../Components/SectionHome7/SectionHome7';
import SectionNews1 from '../../Components/SectionNews1/SectionNews1';
import SectionNewsUnique1 from '../../Components/SectionNewsUnique1/SectionNewsUnique1';
import styles from './NewsUnique.module.scss';
const NewsUnique = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.main}>
      <SectionNews1 />
      <SectionNewsUnique1 />
      <SectionHome4 />
      <SectionHome5 />
      <SectionHome6 />
      <SectionHome7 />
    </main>
  );
};

export default NewsUnique;
