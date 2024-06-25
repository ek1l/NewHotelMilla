/* eslint-disable @typescript-eslint/no-explicit-any */
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
import IMGNAC from '../../assets/img/NAC.png';
import IMGLAC from '../../assets/img/LAC.png';
import IMGRijin from '../../assets/img/Rijn.png';
import IMGRKC from '../../assets/img/RKC.png';
import IMGPSV from '../../assets/img/PSV.png';
import IMGSV from '../../assets/img/SV.png';
import IMGUSV from '../../assets/img/USV.png';
import IMGKampong from '../../assets/img/Kampong.png';
import IMGWKE16 from '../../assets/img/WKE16.png';
import IMGFC from '../../assets/img/FC.png';
import IMGJOS from '../../assets/img/JOS.png';
import IMGCVDEJORDANBOYS from '../../assets/img/CV_de_Jodan_Boys.png';

const SectionOurTeam1 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllPhotosGallerySlice);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllPhotosGallery());
  }, [dispatch]);

  // Imagens dos times locais
  const teamImages = [
    IMGCoreanos,
    IMGExcelsius,
    IMGDos,
    IMGBvv,
    IMGAdo,
    IMGNAC,
    IMGLAC,
    IMGRijin,
    IMGRKC,
    IMGPSV,
    IMGSV,
    IMGUSV,
    IMGKampong,
    IMGWKE16,
    IMGFC,
    IMGJOS,
    IMGCVDEJORDANBOYS,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 5) % teamImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [teamImages.length]);

  const displayedTeamImages = teamImages
    .slice(currentIndex, currentIndex + 5)
    .concat(
      teamImages.slice(0, Math.max(0, currentIndex + 5 - teamImages.length)),
    );

  // Filtrando imagens da API
  const filteredApiImages = data
    .filter((item: any) => item.path)
    .map((item: any) => `${import.meta.env.VITE_APP_API_IMAGE}/${item.path}`);

  return (
    <section className={`${styles.containerBackgroundFundo} animationEntrando`}>
      <div
        className={`${styles.imgBackground}`}
        style={{
          background: `url(${
            filteredApiImages[currentIndex % filteredApiImages.length] || ''
          })`,
        }}
      >
        <div className={styles.filtro}></div>
        <div className={styles.containerSearchAndTimes}>
          <div className={styles.times}>
            {displayedTeamImages.map((image, index) => (
              <img
                key={index}
                className={styles.img}
                src={image}
                alt={`Time ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOurTeam1;
