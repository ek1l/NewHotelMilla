/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CardNewsHome from '../CardNewsHome/CardNewsHome';
import styles from './SectionHome7.module.scss';
import { getAllnews } from '../../redux/reducers/getAllNews';

const SectionHome7 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllnewsSlice);
  useEffect(() => {
    dispatch(getAllnews());
  }, [dispatch]);
  return (
    <section className={styles.section}>
      {data.length > 0 ? (
        <div className={styles.containerSection}>
          <div className={styles.newsText}>
            <div className={styles.news1}>
              <h1 className={styles.newsTitle}>NEWS</h1>
            </div>
            <div className={styles.cardsNewsContainer}>
              {data.length > 0
                ? data
                    .slice(0, 3)
                    .map((news: any) => (
                      <CardNewsHome
                        key={news.id}
                        title={news.title}
                        description={news.description}
                        author={news.author}
                        date={news.createdAt}
                        banner={news.banner}
                        id={news.id}
                      />
                    ))
                    .reverse()
                : null}
            </div>
            <div className={styles.news2}>
              <h1 className={styles.newsTitle}>NEWS</h1>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SectionHome7;
