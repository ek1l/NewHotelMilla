import styles from './BannerCardSimple.module.scss';
import IMGTesteTime from '../../assets/testeIMG/barcelona.webp';
const BannerCardSimple = () => {
  // const truncarString = (string: string, quantidade: number) => {
  //   if (string.length <= quantidade) {
  //     return string;
  //   } else {
  //     return string.slice(0, quantidade) + '...';
  //   }
  // };
  return (
    <div className={styles.containerBannerCardSimple}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={IMGTesteTime} alt="Banner IMG" />
        <div className={styles.filtro}></div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infoEsquerda}>
          <h1 className={styles.title}>The best references are here</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={styles.infoDireita}>
          <div className={styles.infoPContainer}>
            <p className={styles.infoP}>
              "De doelstelling van het trainingsweekend was het
              creëren/versterken van de eenheid binnen de groep, en daar zijn we
              in geslaagd."
            </p>
          </div>
          <div className={styles.nameAuthorContainer}>
            <h2 className={styles.h2}>WNC Waardenburg</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCardSimple;
