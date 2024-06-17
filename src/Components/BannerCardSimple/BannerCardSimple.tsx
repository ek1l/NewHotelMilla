/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '../../redux/store';
import styles from './BannerCardSimple.module.scss';
import IMGTrash from '../../assets/img/deleteIco.svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { deleteSlider } from '../../redux/reducers/deleteSlider';
import { getAllSlider } from '../../redux/reducers/getAllSlider';

const BannerCardSimple = ({
  imagem,
  description,
  title,
  comment,
  author,
  id,
}: any) => {
  const [trash, setTrash] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname.startsWith('/admin/login')) {
      setTrash(true);
    } else {
      setTrash(false);
    }
  }, [location.pathname]);

  const deleteSliderFunc = async (id: any) => {
    const response = await dispatch(deleteSlider(id));
    if (response.type === 'deleteSlider/fulfilled') {
      dispatch(getAllSlider());
    } else {
      throw new Error('Delete Slider Error');
    }
  };

  const truncarString = (string: string, quantidade: number) => {
    if (string.length <= quantidade) {
      return string;
    } else {
      return string.slice(0, quantidade) + '...';
    }
  };

  return (
    <div className={styles.containerBannerCardSimple}>
      {trash && (
        <img
          className={styles.trash}
          src={IMGTrash}
          alt="trash"
          onClick={() => deleteSliderFunc(id)}
        />
      )}
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${imagem}`}
          alt="Banner IMG"
        />
        {!trash && <div className={styles.filtro}></div>}
      </div>
      <div className={styles.infos}>
        <div className={styles.infoEsquerda}>
          <h1 className={styles.title}>{truncarString(title, 30)}</h1>
          <p className={styles.description}>
            {truncarString(description, 231)}
          </p>
        </div>
        <div className={styles.infoDireita}>
          <div className={styles.infoPContainer}>
            <p className={styles.infoP}>{truncarString(comment, 130)}</p>
          </div>
          <div className={styles.nameAuthorContainer}>
            <h2 className={styles.h2}>{truncarString(author, 17)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCardSimple;
