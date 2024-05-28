import { useEffect } from 'react';
import SectionOffers1 from '../../Components/SectionOffers1/SectionOffers1';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './Offers.module.scss';
import { getAllhotelsParams } from '../../redux/reducers/getAllHotels';
const Offers = () => {
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state) => state.getTextparamsSlice);
  useEffect(() => {
    window.scrollTo(0, 0);
    let modifiedText = text.replace(/&city/g, '');
    modifiedText = modifiedText.replace(/&=undefined/g, '');
    dispatch(getAllhotelsParams(modifiedText));
  }, [dispatch, text]);
  return (
    <main className={styles.main}>
      <SectionOffers1 />
    </main>
  );
};

export default Offers;
