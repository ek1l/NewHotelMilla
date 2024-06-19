/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHotelUnique2.module.scss';
import { useAppSelector } from '../../redux/store';
import DescriptionHotelUnique from '../DescriptionHotelUnique/DescriptionHotelUnique';

const SectionHotelUnique2 = () => {
  const { data }: any = useAppSelector((state) => state.getOneHotelSlice);
  
  return (
    <section className={styles.section}>
      {data.length > 0 ? (
        <div className={styles.containerSection}>
          <div className={styles.containerEsquerdo}>
            <div className={styles.commentContainer}>
              <div className={styles.infoComment}>
                <div className={styles.photoAndComment}>
                  <img
                    className={styles.img}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                      data[0].description.comment.photo
                    }`}
                    alt="Photo People"
                  />
                  <p className={styles.comment}>
                    "{data[0].description.comment.comment}"
                  </p>
                </div>
                <div className={styles.nameAuthor}>
                  <p className={styles.name}>
                    {data[0].description.comment.author}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.containerFilters}>
              {data[0].facilities.map(({ facility }: any) => {
                return <p className={styles.filters}>{facility}</p>;
              })}
            </div>
            <div className={styles.containerDescriptions}>
              <DescriptionHotelUnique
                title={'Destination'}
                description={data[0].description.destination}
              />
              <DescriptionHotelUnique
                title={'Accommodation'}
                description={data[0].description.accommodation}
              />
              <DescriptionHotelUnique
                title={'Activities'}
                description={data[0].description.activities}
              />
            </div>
          </div>
          <div className={styles.containerDireito}>
            <div className={styles.cardUniqueHotel}>
              <div className={styles.card}>
                <h1 className={styles.titleCard}>Op aanvraag</h1>
                <span className={styles.DaysAndConditionSpan}>
                  {data[0]?.travelTime[0]?.travelTime} |{' '}
                  {data[0]?.condition[0]?.condition}
                </span>
                <p className={styles.descriptionCard}>
                  Description - card (can be a bigger text like this).
                </p>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data[0].card.description1}</p>
                </div>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data[0].card.description2}</p>
                </div>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data[0].card.description2}</p>
                </div>
                <div className={styles.buttonAsk}>
                  <button className={styles.button}>Ask for an offer</button>
                </div>
              </div>
            </div>
            {data[0].movie ? (
              <video className={styles.imgVideo} controls autoPlay>
                <source
                  src={`${import.meta.env.VITE_APP_API_IMAGE}/${data[0].movie}`}
                  type="video/mp4"
                />
              </video>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SectionHotelUnique2;
