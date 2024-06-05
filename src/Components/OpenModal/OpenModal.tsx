import styles from './OpenModal.module.scss';
import IMGIconeWPP from '../../assets/img/wppIcone.png';
import { useAppDispatch } from '../../redux/store';
import { toggleModalFunction } from '../../redux/reducers/toggleModal';
import { Link } from 'react-router-dom';
const OpenModal = () => {
  const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(toggleModalFunction());
  };
  return (
    <div className={styles.containerOpenModal}>
      <div onClick={openModal} className={styles.askForAnOffer}>
        <h1 className={styles.title}>ASk for an offer</h1>
      </div>
      <Link
        to="https://api.whatsapp.com/send?phone=310786291577&text=Trainingskampen.nl%2020%20jaar%20d%C3%A9%20specialist%20in%20trainingskampen%20|%20ontzorging%20van%20A%20tot%20Z%20voor%20alle%20sportkampen%20op%20maat"
        target="_blank"
        className={styles.button}
      >
        <img className={styles.img} src={IMGIconeWPP} alt="Icon Wpp" />
      </Link>
    </div>
  );
};

export default OpenModal;
