import styles from './SectionHome4.module.scss';
import IMGMulherRedes from '../../assets/img/mulheresrede.png';

const SectionHome4 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.containerSection}>
        <div className={styles.containerTextAndDescription}>
          <div className={styles.titleAndDescriptionAndButton}>
            <h1 className={styles.title}>
              Werk aan de teambuilding met Trainingskampen.nl
            </h1>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                Een succesvol seizoen begint met een goed georganiseerde
                voorbereidingsperiode tijdens zowel de zomer- als de winterstop.
                Het is van essentieel belang dat deze periode gepaard gaat met
                uitstekende sportfaciliteiten en dat aan alle details wordt
                gedacht. Trainingskampen.nl biedt een volledig verzorgd
                trainingskamp aan dat voldoet aan al uw wensen en behoeften,
                ongeacht het budget van uw team. Dit bespaart niet alleen tijd,
                maar ook energie voor het hele team!
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
