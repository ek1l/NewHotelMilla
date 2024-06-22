/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import styles from './ManageNews.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { useEffect, useState } from 'react';

import CardNews from '../CardNews/CardNews';
import { createNews } from '../../redux/reducers/createNews';
import { getAllnews } from '../../redux/reducers/getAllNews';

const ManageNews = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllnewsSlice);
  const { handleSubmit, register, reset } = useForm();
  const [created, setCreated] = useState(false);
  const submit = async (formData: any) => {
    const { banner, title, author, description, content } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('author', author);
    formDataToSend.append('description', description);
    formDataToSend.append('content', content);
    formDataToSend.append('banner', banner[0]);

    const response = await dispatch(createNews(formDataToSend));

    if (response.type === 'createNews/fulfilled') {
      setCreated(true);
      setTimeout(() => {
        setCreated(false);
      }, 1000);
      dispatch(getAllnews());
      reset();
      return response;
    }
  };
  useEffect(() => {
    dispatch(getAllnews());
  }, [dispatch]);
  return (
    <div className={styles.containerManageNews}>
      <div className={styles.title}>
        <h1>Add News</h1>
      </div>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <Input
          {...register('title')}
          label="Title"
          type="text"
          width="100%"
          height="100%"
        />
        <Input
          {...register('author')}
          label="Author"
          type="text"
          width="100%"
          height="100%"
        />
        <Input
          {...register('description')}
          label="Description"
          type="text"
          width="100%"
          height="100%"
        />
        <Input
          {...register('content')}
          label="Content"
          type="text"
          width="100%"
          height="100%"
        />
        <Input
          {...register('banner')}
          label="Banner"
          type="file"
          width="100%"
          height="100%"
        />
        <button type="submit">Create News</button>
        {created && <span className={styles.created}>News created!</span>}
      </form>
      <div className={styles.containerNewsCreated}>
        {data.length > 0
          ? data.map((news: any) => (
              <CardNews
                key={news.id}
                title={news.title}
                image={news.banner}
                descriptionCard={news.description}
                createdAt={news.created_at}
                updatedAt={news.updated_at}
                id={news.id}
                isAdmin={true}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ManageNews;
