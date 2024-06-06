/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './ManageGallery.module.scss';
import IMGDELETEICON from '../../assets/img/deleteIco.svg';
import { getAllPhotosGallery } from '../../redux/reducers/getAllPhotosGallery';
import InputPanelAdmin from '../InputPanelAdmin/InputPanelAdmin';
import { createNewPhotoGalery } from '../../redux/reducers/createNewPhotoGalery';
import { addNewVideoGallery } from '../../redux/reducers/addNewVideoGallery';
import { deletePhotoGalery } from '../../redux/reducers/deletephotogallery';

const notifySuccessCreate = () => toast.success('Photo Created successfully');
const notifyErrorCreate = () => toast.error('Photo not Created');
const notifySuccessVideo = () => toast.success('Video Created successfully');
const notifyErrorVideo = () => toast.error('Video not Created');
const notifySuccessDelete = () => toast.success(' Deleted successfully');
const notifyErrorDelete = () => toast.error(' Not Deleted');

const ManageGallery = () => {
  const { loading } = useAppSelector((state) => state.addNewVideoGallerySlice);
  const { data } = useAppSelector((state) => state.getAllPhotosGallerySlice);
  const dispatch = useAppDispatch();

  const { handleSubmit, register, reset } = useForm();

  const submit = async (formData: any) => {
    const { galery } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('galery', galery[0]);

    const response = await dispatch(createNewPhotoGalery(formDataToSend));

    if (response.type === 'createNewPhotoGalery/fulfilled') {
      dispatch(getAllPhotosGallery());
      notifySuccessCreate();
      reset();
    } else {
      notifyErrorCreate();
    }
  };

  const submitDois = async (formData: any) => {
    const { galeryMovie } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('galeryMovie', galeryMovie[0]);
    // @ts-ignore
    const response = await dispatch(addNewVideoGallery(formDataToSend));

    if (response.type === 'addNewVideoGallery/fulfilled') {
      notifySuccessVideo();
      dispatch(getAllPhotosGallery());
      reset();
    } else {
      notifyErrorVideo();
    }
  };

  const handleDeletePhoto = async (id: any) => {
    // @ts-ignore
    const response = await dispatch(deletePhotoGalery(id));

    if (response.type === 'deletePhotoGalery/fulfilled') {
      notifySuccessDelete();
      dispatch(getAllPhotosGallery());
    } else {
      notifyErrorDelete();
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getAllPhotosGallery());
    }
  }, [data.length, dispatch]);

  const isVideo = (item: any) => {
    const extension = item.path.split('.').pop();
    const videoExtensions = ['mp4'];
    return videoExtensions.includes(extension.toLowerCase());
  };

  return (
    <div className={styles.containerGallery}>
      <ToastContainer closeOnClick autoClose={2000} />
      <div className={styles.titleGallery}>
        <h1>Add photo or video</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <InputPanelAdmin
          label="Photo"
          {...register('galery')}
          type="file"
          width="100%"
          height="100%"
        />
        <button>Add Photo Gallery</button>
      </form>
      <form className={styles.form} onSubmit={handleSubmit(submitDois)}>
        <InputPanelAdmin
          label="Video"
          {...register('galeryMovie')}
          type="file"
          width="100%"
          height="100%"
        />

        {loading ? (
          <button disabled>Sending...</button>
        ) : (
          <button>Add Video Gallery</button>
        )}
      </form>
      <div className={styles.containerPhotosGallery}>
        {data.length > 0 &&
          data.map((item: any) => (
            <div key={item.id} className={styles.containerButtonDelete}>
              {isVideo(item) ? (
                <video key={item.id} controls className={styles.img}>
                  <source
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${item.path}`}
                  />
                </video>
              ) : (
                <img
                  className={styles.img}
                  key={item.id}
                  src={`${import.meta.env.VITE_APP_API_IMAGE}/${item.path}`}
                  alt="gallery item"
                />
              )}
              <button onClick={() => handleDeletePhoto(item.id)}>
                <img src={IMGDELETEICON} alt="icon delete button" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageGallery;
