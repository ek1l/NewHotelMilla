/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getAllnews } from '../../redux/reducers/getAllNews';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CardNewsHome from '../CardNewsHome/CardNewsHome';
import styles from './SectionNews2.module.scss';
import IMGArrowSearch from '../../assets/img/arrowSearch.png';

const SectionNews2 = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getAllnewsSlice);
  const [visibleCount, setVisibleCount] = useState(12);
  useEffect(() => {
    dispatch(getAllnews());
  }, [dispatch]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 1);
  };

  return (
    <section className={`${styles.section} animationEntrando`}>
      <div className={styles.containerSection}>
        <div className={styles.titleAndDescription}>
          <h1 className={styles.title}>News</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className={styles.containerCardnews}>
          {data.length > 0
            ? data
                .slice(0, visibleCount)
                .map((news: any) => (
                  <CardNewsHome
                    key={news.id}
                    title={news.title}
                    description={news.description}
                    author={news.author}
                    date={news.created_at}
                    banner={news.banner}
                    id={news.id}
                  />
                ))
                .reverse()
            : null}
        </div>
        {visibleCount < data.length && (
          <div className={styles.containerButtonDiv}>
            <button onClick={handleViewMore} className={styles.viewMoreButton}>
              View More <img src={IMGArrowSearch} alt="Arrow View More" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionNews2;
