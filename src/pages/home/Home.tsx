import { useEffect } from 'react';
import SectionHome1 from '../../Components/SectionHome1/SectionHome1';
import SectionHome2 from '../../Components/SectionHome2/SectionHome2';
import SectionHome3 from '../../Components/SectionHome3/SectionHome3';
import SectionHome4 from '../../Components/SectionHome4/SectionHome4';
import SectionHome5 from '../../Components/SectionHome5/SectionHome5';
import SectionHome6 from '../../Components/SectionHome6/SectionHome6';
import SectionHome7 from '../../Components/SectionHome7/SectionHome7';
import styles from './Home.module.scss';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.main}>
      <SectionHome1 />
      <SectionHome2 />
      <SectionHome3 />
      <SectionHome4 />
      <SectionHome5 />
      <SectionHome6 />
      <SectionHome7 />
    </main>
  );
};

export default Home;
