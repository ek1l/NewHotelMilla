/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './SectionGallery1.module.scss';
import { getAllPhotosGallery } from '../../redux/reducers/getAllPhotosGallery';
import { getIdPhoto } from '../../redux/reducers/getOnePhotoGallery';
import { useNavigate } from 'react-router-dom';

const SectionGallery1 = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector(
    (state) => state.getAllPhotosGallerySlice,
  );

  useEffect(() => {
    dispatch(getAllPhotosGallery());
  }, [dispatch]);

  const separarMedia = (items: any[]) => {
    const fotos: any = [];
    const videos: any = [];
    items.forEach((item) => {
      const extensao = item.path.split('.').pop().toLowerCase();
      if (
        [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'webp',
          'svg',
          'jfif',
          'avif',
          'apng',
          'tiff',
          'bmp',
          'heic',
          'heif',
        ].includes(extensao)
      ) {
        fotos.push(item);
      } else if (
        [
          'mp4',
          'mov',
          'avi',
          'mkv',
          'webm',
          'wmv',
          'flv',
          'm4v',
          '3gp',
          'mpg',
          'mpeg',
        ].includes(extensao)
      ) {
        videos.push(item);
      }
    });
    return { fotos, videos };
  };
  const navigate = useNavigate();
  const { fotos, videos } = separarMedia(data);
  const getIdPhotoFunction = (id: any) => {
    dispatch(getIdPhoto(id));
    navigate(`/gallery/${id}`);
  };
  return (
    <section className={styles.section}>
      {data.length > 0 ? (
        <div className={styles.sectionContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Gallery</h1>
          </div>
          <div className={styles.containerPhotosAndVideos}>
            {fotos.map((item: any, index: number) => (
              <>
                <div
                  onClick={() => getIdPhotoFunction(item.id)}
                  key={index}
                  className={styles.itemContainer}
                >
                  <img
                    className={styles.img}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${item.path}`}
                    alt="Photo Gallery"
                  />
                </div>
              </>
            ))}
            {videos.map((item: any, index: number) => (
              <>
                <div key={index} className={styles.itemContainer}>
                  <video
                    className={styles.img}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${item.path}`}
                    controls
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SectionGallery1;
