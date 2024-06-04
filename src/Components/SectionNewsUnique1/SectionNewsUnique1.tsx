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
  console.log(data);
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
              <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Proin libero nunc consequat interdum varius. Odio pellentesque
                diam volutpat commodo sed egestas. Urna porttitor rhoncus dolor
                purus non enim praesent elementum. Neque volutpat ac tincidunt
                vitae semper quis lectus. Neque convallis a cras semper auctor.
                Justo donec enim diam vulputate ut. Nunc pulvinar sapien et
                ligula ullamcorper malesuada. Imperdiet nulla malesuada
                pellentesque elit eget gravida cum sociis. Arcu risus quis
                varius quam quisque id. Tristique sollicitudin nibh sit amet
                commodo nulla facilisi nullam vehicula. Nulla aliquet enim
                tortor at. Leo urna molestie at elementum eu. Feugiat vivamus at
                augue eget. Consectetur libero id faucibus nisl tincidunt eget
                nullam non nisi. Pharetra massa massa ultricies mi quis
                hendrerit dolor magna. Sed risus pretium quam vulputate
                dignissim suspendisse in est ante. Vitae congue eu consequat ac
                felis donec. Sed ullamcorper morbi tincidunt ornare. Suspendisse
                potenti nullam ac tortor vitae purus faucibus. Pellentesque id
                nibh tortor id. Aenean et tortor at risus viverra adipiscing at.
                Mauris vitae ultricies leo integer malesuada nunc. Aliquet
                lectus proin nibh nisl condimentum id. Bibendum enim facilisis
                gravida neque convallis a. Amet nisl purus in mollis nunc sed
                id. Congue nisi vitae suscipit tellus mauris a diam. Sit amet
                porttitor eget dolor morbi non arcu risus. Pharetra convallis
                posuere morbi leo urna. Vestibulum lectus mauris ultrices eros
                in cursus turpis massa. Tincidunt id aliquet risus feugiat in
                ante. Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                Nisl tincidunt eget nullam non nisi est sit amet. Urna et
                pharetra pharetra massa. Integer feugiat scelerisque varius
                morbi enim nunc faucibus a pellentesque. Sed arcu non odio
                euismod lacinia at quis.
              </p>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Proin libero nunc consequat interdum varius. Odio pellentesque
                diam volutpat commodo sed egestas. Urna porttitor rhoncus dolor
                purus non enim praesent elementum. Neque volutpat ac tincidunt
                vitae semper quis lectus. Neque convallis a cras semper auctor.
                Justo donec enim diam vulputate ut. Nunc pulvinar sapien et
                ligula ullamcorper malesuada. Imperdiet nulla malesuada
                pellentesque elit eget gravida cum sociis. Arcu risus quis
                varius quam quisque id. Tristique sollicitudin nibh sit amet
                commodo nulla facilisi nullam vehicula. Nulla aliquet enim
                tortor at. Leo urna molestie at elementum eu. Feugiat vivamus at
                augue eget. Consectetur libero id faucibus nisl tincidunt eget
                nullam non nisi. Pharetra massa massa ultricies mi quis
                hendrerit dolor magna. Sed risus pretium quam vulputate
                dignissim suspendisse in est ante. Vitae congue eu consequat ac
                felis donec. Sed ullamcorper morbi tincidunt ornare. Suspendisse
                potenti nullam ac tortor vitae purus faucibus. Pellentesque id
                nibh tortor id. Aenean et tortor at risus viverra adipiscing at.
                Mauris vitae ultricies leo integer malesuada nunc. Aliquet
                lectus proin nibh nisl condimentum id. Bibendum enim facilisis
                gravida neque convallis a. Amet nisl purus in mollis nunc sed
                id. Congue nisi vitae suscipit tellus mauris a diam. Sit amet
                porttitor eget dolor morbi non arcu risus. Pharetra convallis
                posuere morbi leo urna. Vestibulum lectus mauris ultrices eros
                in cursus turpis massa. Tincidunt id aliquet risus feugiat in
                ante. Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                Nisl tincidunt eget nullam non nisi est sit amet. Urna et
                pharetra pharetra massa. Integer feugiat scelerisque varius
                morbi enim nunc faucibus a pellentesque. Sed arcu non odio
                euismod lacinia at quis.
              </p>
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
