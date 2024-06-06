/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './EditNews.module.scss';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { toast } from 'react-toastify';
import { getOneNews } from '../../redux/reducers/getOneNews';
import { editNews } from '../../redux/reducers/editNews';
import { getAllnews } from '../../redux/reducers/getAllNews';
import InputPanelAdmin from '../InputPanelAdmin/InputPanelAdmin';

const notifySuccessEdited = () => toast.success('News Edited successfully');
const notifyErrorEdited = () => toast.error('News not Edited');

const EditNews = ({ handleOpenModalEditNews }: any) => {
  const dispatch = useAppDispatch();
  const { idEditNews } = useAppSelector((state) => state.editNewsSlice);
  const { data } = useAppSelector((state: any) => state.getOneNewsSlice);
  const { handleSubmit, register } = useForm({
    values: {
      title: data[0]?.title || '',
      author: data[0]?.author || '',
      description: data[0]?.description || '',
      content: data[0]?.content || '',
    },
  });

  const submit = async (formData: any) => {
    const { title, author, description, content, banner } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('author', author);
    formDataToSend.append('description', description);
    formDataToSend.append('content', content);
    formDataToSend.append('banner', banner[0]);

    const objectSend = {
      id: idEditNews,
      dataNews: formDataToSend,
    };
    //@ts-ignore
    const response = await dispatch(editNews(objectSend));
    if (response.type === 'editNews/fulfilled') {
      notifySuccessEdited();
      handleOpenModalEditNews();
      dispatch(getAllnews());
    } else {
      notifyErrorEdited();
    }
  };
  useEffect(() => {
    //@ts-ignore
    dispatch(getOneNews(idEditNews));
  }, [dispatch, idEditNews]);
  return (
    <div className={`${styles.containerEditNewsModule} animationFormModal`}>
      <div className={styles.closeButton}>
        <button onClick={handleOpenModalEditNews}>X</button>
      </div>
      {data.length > 0 ? (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <InputPanelAdmin
            type="text"
            label="Title"
            {...register('title')}
            height="100%"
            width="100%"
          />
          <InputPanelAdmin
            type="text"
            label="Author"
            {...register('author')}
            height="100%"
            width="100%"
          />
          <InputPanelAdmin
            type="text"
            label="Description"
            {...register('description')}
            height="100%"
            width="100%"
          />
          <InputPanelAdmin
            type="text"
            label="Content"
            {...register('content')}
            height="100%"
            width="100%"
          />
          <InputPanelAdmin
            type="file"
            label="Banner"
            //@ts-ignore
            {...register('banner')}
            height="100%"
            width="100%"
          />
          <button>Enviar</button>
        </form>
      ) : null}
    </div>
  );
};

export default EditNews;
