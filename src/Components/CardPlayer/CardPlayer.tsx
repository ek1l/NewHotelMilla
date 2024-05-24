/* eslint-disable @typescript-eslint/ban-ts-comment */

import styles from './CardPlayer.module.scss';
import IMGTestePlayer from '../../assets/testeIMG/image1test.png';

const CardPlayer = ({ name, functionPlayer, img }: any) => {
  return (
    <div className={styles.cardPlayerContainer}>
      <img className={styles.img} src={IMGTestePlayer} alt="Player" />
      <div className={styles.greenBorder}></div>
      <div className={styles.infoPlayer}>
        <div className={styles.nameAndFunction}>
          <h2 className={styles.name}>Name</h2>
          <span className={styles.function}>Function</span>
        </div>
      </div>
    </div>
  );
};

export default CardPlayer;
