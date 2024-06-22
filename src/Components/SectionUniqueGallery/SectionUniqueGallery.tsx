/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionUniqueGallery.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import arrowBack from '../../assets/img/arrowInputSelect.png';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getOnePhoto } from '../../redux/reducers/getOnePhotoGallery';

const SectionUniqueGallery = () => {
  const dispatch = useAppDispatch();
  const { data }: { data: any } = useAppSelector(
    (state) => state.getOnePhotoSlice,
  );
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getOnePhoto());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const images = data.filter((image: any) =>
        /\.(jpg|jpeg|png|gif)$/i.test(image.path),
      );
      if (id) {
        const initialImageIndex = images.findIndex(
          (image: any) => image.id === Number(id),
        );
        if (initialImageIndex !== -1) {
          const reorderedImages = [
            images[initialImageIndex],
            ...images.slice(0, initialImageIndex),
            ...images.slice(initialImageIndex + 1),
          ];
          setFilteredImages(reorderedImages);
          setCurrentImageIndex(0);
        } else {
          setFilteredImages(images);
        }
      } else {
        setFilteredImages(images);
      }
    }
  }, [id, data]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (filteredImages.length > 0) {
    return (
      <section className={`${styles.section} animationEntrando`}>
        <div className={styles.containerSection}>
          <div className={styles.offersAndHotelNameAndStarAndCityAndCountry}>
            <Link className={styles.link} to="/gallery">
              <img
                className={styles.arrowBack}
                src={arrowBack}
                alt="BackButton"
              />
              Gallery
            </Link>
          </div>
          <div className={styles.carroussel}>
            <button className={styles.arrow} onClick={handlePrevClick}></button>
            <div className={styles.imageContainer}>
              <img
                className={styles.imgCarroussel}
                src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                  filteredImages[currentImageIndex].path
                }`}
                alt="CarrousselIMG"
              />
            </div>
            <button className={styles.arrow} onClick={handleNextClick}></button>
            <div className={styles.thumbnails}>
              {filteredImages.map((image: any, index: number) => (
                <img
                  key={image.id}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.active : ''
                  }`}
                  src={`${import.meta.env.VITE_APP_API_IMAGE}/${image.path}`}
                  alt={`Thumbnail-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default SectionUniqueGallery;
