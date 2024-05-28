import SectionHome5 from '../../Components/SectionHome5/SectionHome5';
import SectionHome6 from '../../Components/SectionHome6/SectionHome6';
import SectionHome7 from '../../Components/SectionHome7/SectionHome7';
import SectionOurTeam1 from '../../Components/SectionOurTeam1/SectionOurTeam1';
import SectionOurTeam2 from '../../Components/SectionOurTeam2/SectionOurTeam2';
import SectionOurTeam3 from '../../Components/SectionOurTeam3/SectionOurTeam3';
import styles from './OurTeam.module.scss';
const OurTeam = () => {
  return (
    <main className={styles.main}>
      <SectionOurTeam1 />
      <SectionOurTeam2 />
      <SectionOurTeam3 />
      <SectionHome5 />
      <SectionHome6 />
      <SectionHome7 />
    </main>
  );
};

export default OurTeam;
