/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './DescriptionHotelUnique.module.scss';
const DescriptionHotelUnique = ({ title, description }: any) => {
  return (
    <div className={styles.containerDescription}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default DescriptionHotelUnique;
