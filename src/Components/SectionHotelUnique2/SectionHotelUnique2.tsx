/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHotelUnique2.module.scss';
import { useAppSelector } from '../../redux/store';
import DescriptionHotelUnique from '../DescriptionHotelUnique/DescriptionHotelUnique';

const SectionHotelUnique2 = () => {
  const { data }: any = useAppSelector((state) => state.getOneHotelSlice);
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  return (
    <section className={styles.section}>
      {data.id ? (
        <div className={styles.containerSection}>
          <div className={styles.containerEsquerdo}>
            <div className={styles.commentContainer}>
              <div className={styles.infoComment}>
                <div className={styles.photoAndComment}>
                  <img
                    className={styles.img}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                      data.description.comment.photo
                    }`}
                    alt="Photo People"
                  />
                  <p className={styles.comment}>
                    "{data.description.comment.comment}"
                  </p>
                </div>
                <div className={styles.nameAuthor}>
                  <p className={styles.name}>
                    {data.description.comment.author}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.containerFilters}>
              {data.facilities.map(({ facility }: any) => {
                return <p className={styles.filters}>{facility}</p>;
              })}
            </div>
            <div className={styles.containerDescriptions}>
              <DescriptionHotelUnique
                title={`${dutch ? 'Bestemming' : 'Destination'}`}
                description={data.description.destination}
              />
              <DescriptionHotelUnique
                title={`${dutch ? 'Accommodatie' : 'Accommodation'}`}
                description={data.description.accommodation}
              />
              <DescriptionHotelUnique
                title={`${dutch ? 'Activiteiten' : 'Activities'}`}
                description={data.description.activities}
              />
            </div>
          </div>
          <div className={styles.containerDireito}>
            <div className={styles.cardUniqueHotel}>
              <div className={styles.card}>
                <h1 className={styles.titleCard}>{data.card.title}</h1>
                <span className={styles.DaysAndConditionSpan}>
                  {data?.travelTime[0]?.travel_time} |{' '}
                  {data?.conditions[0]?.condition}
                </span>
                <p className={styles.descriptionCard}>
                  {data.card.description_big}
                </p>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data.card.description1}</p>
                </div>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data.card.description2}</p>
                </div>
                <div className={styles.textAndBallGreen}>
                  <div className={styles.ball}></div>
                  <p className={styles.text}>{data.card.description2}</p>
                </div>
                <div className={styles.buttonAsk}>
                  <button className={styles.button}>Ask for an offer</button>
                </div>
              </div>
            </div>
            {data.movie ? (
              <video className={styles.imgVideo} controls autoPlay>
                <source
                  src={`${import.meta.env.VITE_APP_API_IMAGE}/${data.movie}`}
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
