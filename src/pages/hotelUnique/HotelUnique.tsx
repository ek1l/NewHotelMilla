import SectionHotelUnique1 from '../../Components/SectionHotelUnique1/SectionHotelUnique1';
import SectionHotelUnique2 from '../../Components/SectionHotelUnique2/SectionHotelUnique2';
import styles from './Hotelunique.module.scss';
const hotelUnique = () => {
  return (
    <main className={styles.main}>
      <SectionHotelUnique1 />
      <SectionHotelUnique2 />
    </main>
  );
};

export default hotelUnique;
