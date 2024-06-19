/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './SectionNewsUnique1.module.scss';
import { useEffect } from 'react';
import { getOneNews } from '../../redux/reducers/getOneNews';

const SectionNewsUnique1 = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getOneNewsSlice);
 
  useEffect(() => {
    dispatch(getOneNews(id));
  }, [dispatch, id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  return (
    <section className={styles.section}>
      {data.length > 0 ? (
        <div className={styles.containerSection}>
          <div className={styles.titleAndAuthorAndDateAndDay}>
            <h1 className={styles.title}>{data[0].title}</h1>
            <div className={styles.authorAndDate}>
              <span className={styles.authorAndDateSpan}>{data[0].author}</span>
              <span className={styles.authorAndDateSpan}>
                {formatDate(data[0].createdAt)}
              </span>
            </div>
          </div>
          <div className={styles.containerNewsAndBanner}>
            <div className={styles.containerNews}>
              <p className={styles.description}>{data[0].content}</p>
              <p className={styles.description}>{data[0].description}</p>
            </div>
            <div className={styles.banner}>
              <img
                className={styles.bannerImg}
                src={`${import.meta.env.VITE_APP_API_IMAGE}/${data[0].banner}`}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SectionNewsUnique1;
