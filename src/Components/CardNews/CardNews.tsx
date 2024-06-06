/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { format, differenceInMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './CardNews.module.scss';
import IMGDeleteNewsIco from '../../assets/img/deleteIco.svg';
import IMGEditNewsico from '../../assets/img/editIco.svg';
import { useAppDispatch } from '../../redux/store';
import { ToastContainer, toast } from 'react-toastify';

 
import EditNews from '../EditNews/EditNews';
 
import { useState } from 'react';
import { getAllnews } from '../../redux/reducers/getAllNews';
import { deleteNews } from '../../redux/reducers/deleteNews';
import { setIdEditNews } from '../../redux/reducers/editNews';
const notifySuccessDelete = () => toast.success('News Deleted successfully');
const notifyErrorDelete = () => toast.error('News not Deleted');

const CardNews = ({
  title,
  image,
  descriptionCard,
  createdAt,
  updatedAt,
  id,
  isAdmin,
}: any) => {
  const dispatch = useAppDispatch();

  const description = descriptionCard;
  const [handleOpenModalEdit, setHandleOpenModalEdit] =
    useState<boolean>(false);
  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  };

  const formatarData = (data: string) => {
    return format(new Date(data), 'MM/dd/yyyy h:mm a', { locale: enUS });
  };

  const calcularDiferencaMinutos = (dataAtualizacao: string) => {
    const agora = new Date();
    const dataAtualizacaoDate = new Date(dataAtualizacao);
    return differenceInMinutes(agora, dataAtualizacaoDate);
  };

  const formatarDiferencaMinutos = (minutos: number) => {
    if (minutos < 60) {
      return `Updated ${minutos} minutes ago`;
    } else {
      const horas = Math.floor(minutos / 60);
      const minutosRestantes = minutos % 60;
      return `Updated ${horas} hours and ${minutosRestantes} minutes ago`;
    }
  };

  const handleDeleteNews = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteNews(id));
    if (response.type === 'deleteNews/fulfilled') {
      notifySuccessDelete();
      dispatch(getAllnews());
      return response;
    } else {
      notifyErrorDelete();
    }
  };

  const handleOpenModalEditNews = () => {
    setHandleOpenModalEdit(!handleOpenModalEdit);
  };

  const handleGetIdNews = (id: number) => {
    // @ts-ignore
    dispatch(setIdEditNews(id));
    handleOpenModalEditNews();
  };

  return (
    <>
      <ToastContainer closeOnClick autoClose={2000} />
      <Link
        className={styles.positionDelete}
        to={isAdmin ? `#` : `/news/${id}`}
      >
        <div className={styles.cardNews}>
          <img
            src={`${import.meta.env.VITE_APP_API_IMAGE}/${image}`}
            alt="Image News"
          />
          <div className={styles.info}>
            <div className={styles.titleAndDateNews}>
              <h1>{truncateText(title, 20)}</h1>
              <p className={styles.dateAndTime}>
                {formatarData(createdAt)} -{' '}
                {formatarDiferencaMinutos(calcularDiferencaMinutos(updatedAt))}
              </p>
            </div>
            <div className={styles.description}>
              <p>{truncateText(description, 100)}</p>
            </div>
          </div>
          {isAdmin && (
            <div className={styles.actions}>
              <button
                onClick={() => handleDeleteNews(id)}
                className={styles.deleteButton}
              >
                <img src={IMGDeleteNewsIco} alt="Delete news ico" />
              </button>
              <button
                onClick={() => handleGetIdNews(id)}
                className={styles.editButton}
              >
                <img src={IMGEditNewsico} alt="Edit news ico" />
              </button>
            </div>
          )}
        </div>
      </Link>
      {isAdmin && handleOpenModalEdit && (
        <EditNews handleOpenModalEditNews={handleOpenModalEditNews} />
      )}
    </>
  );
};

export default CardNews;
