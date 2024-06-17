import styles from './SectionHome4.module.scss';
import IMGMulherRedes from '../../assets/img/mulheresrede.png';

const SectionHome4 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.containerSection}>
        <div className={styles.containerTextAndDescription}>
          <div className={styles.titleAndDescriptionAndButton}>
            <h1 className={styles.title}>Lorem Ipsum</h1>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.photoGallery}>
          <img src={IMGMulherRedes} alt="Photo Gallery" />
        </div>
      </div>
    </section>
  );
};

export default SectionHome4;
