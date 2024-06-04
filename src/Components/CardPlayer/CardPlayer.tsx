/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import styles from './CardPlayer.module.scss';

const CardPlayer = ({ name, functionPlayer, img }: any) => {
  return (
    <div className={styles.cardPlayerContainer}>
      <img
        className={styles.img}
        src={`${import.meta.env.VITE_APP_API_IMAGE}/${img}`}
        alt="Player"
      />
      <div className={styles.greenBorder}></div>
      <div className={styles.infoPlayer}>
        <div className={styles.nameAndFunction}>
          <h2 className={styles.name}>{name}</h2>
          <span className={styles.function}>{functionPlayer}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPlayer;
