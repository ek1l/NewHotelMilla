/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import styles from './SectionOurTeam1.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllPhotosGallery } from '../../redux/reducers/getAllPhotosGallery';
import IMGCoreanos from '../../assets/img/coreanos.png';
import IMGExcelsius from '../../assets/img/excelsior.png';
import IMGDos from '../../assets/img/dos.png';
import IMGBvv from '../../assets/img/bvv.png';
import IMGAdo from '../../assets/img/ado.png';

const SectionOurTeam1 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllPhotosGallerySlice);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllPhotosGallery());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [data.length]);

  return (
    <section className={`${styles.containerBackgroundFundo}`}>
      <div
        className={`${styles.imgBackground}`}
        style={{
          background: `url(${import.meta.env.VITE_APP_API_IMAGE}/${
            // @ts-ignore
            data[currentPhotoIndex]?.path || ''
          })`,
        }}
      >
        <div className={styles.filtro}></div>
        <div className={styles.containerSearchAndTimes}>
          <div className={styles.times}>
            <img className={styles.img} src={IMGCoreanos} alt="Coreanos" />
            <img className={styles.img} src={IMGExcelsius} alt="Excelsius" />
            <img className={styles.img} src={IMGDos} alt="Dos" />
            <img className={styles.img} src={IMGBvv} alt="Bvv" />
            <img className={styles.img} src={IMGAdo} alt="Ado" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOurTeam1;
