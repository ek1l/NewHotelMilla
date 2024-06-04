/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import CardPlayer from '../CardPlayer/CardPlayer';
import styles from './SectionOurTeam3.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllPlayers } from '../../redux/reducers/getAllPlayers';

const SectionOurTeam3 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllPlayersSlice);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);
  return (
    <section className={styles.section}>
      <div className={styles.containerSection}>
        <div className={styles.titleAndDescription}>
          <h1 className={styles.title}>Our team</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className={styles.containerTeam}>
          {data.length > 0
            ? data.map((player: any) => (
                <CardPlayer
                  img={player.photo}
                  name={player.name}
                  functionPlayer={player.role}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default SectionOurTeam3;
