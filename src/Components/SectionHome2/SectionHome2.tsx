import CardHotelHome from '../CardHotelHome/CardHotelHome';
import styles from './SectionHome2.module.scss';
const SectionHome2 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.containerSection2}>
        <div className={styles.textAndDescription}>
          <h1 className={styles.title}>Super deals</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      <div className={styles.carrossel}>
        <CardHotelHome />
      </div>
      </div>
    </section>
  );
};

export default SectionHome2;
