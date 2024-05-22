/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CardHotelHome from '../CardHotelHome/CardHotelHome';
import styles from './SectionHome2.module.scss';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
const SectionHome2 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllhotelsSlice);
  console.log(data);
  useEffect(() => {
    dispatch(getAllhotels());
  }, [dispatch]);
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
          {data.length > 0
            ? data.map((hotel: any) => {
                if (Number(hotel.rating.rating.replace('Sterren', '') == 5)) {
                  return (
                    <CardHotelHome
                      name={hotel.name}
                      stars={Number(hotel.rating.rating.replace('Sterren', ''))}
                      city={hotel.city.name}
                      country={hotel.city.country.name}
                      filtersDay={hotel.travelTime[0].travelTime}
                      filtersCondition={hotel.condition[0].condition}
                      key={hotel.id}
                    />
                  );
                }
              })
            : null}
        </div>
      </div>
    </section>
  );
};

export default SectionHome2;
