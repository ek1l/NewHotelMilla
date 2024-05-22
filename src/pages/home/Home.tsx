import SectionHome1 from '../../Components/SectionHome1/SectionHome1';
import SectionHome2 from '../../Components/SectionHome2/SectionHome2';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.main}>
      <SectionHome1 />
      <SectionHome2 />
    </main>
  );
};

export default Home;
