import SectionHome1 from '../../Components/SectionHome1/SectionHome1';
import SectionHome2 from '../../Components/SectionHome2/SectionHome2';
import SectionHome3 from '../../Components/SectionHome3/SectionHome3';
import SectionHome4 from '../../Components/SectionHome4/SectionHome4';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.main}>
      <SectionHome1 />
      <SectionHome2 />
      <SectionHome3 />
      <SectionHome4 />
    </main>
  );
};

export default Home;
