/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './ManageSlider.module.scss';
import { useAppDispatch } from '../../redux/store';
import { createNewSlider } from '../../redux/reducers/createNewSlider';
const ManageSlider = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm();
  const submit = async (formData: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('information', formData.information);
    formDataToSend.append('comment', formData.comment);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('slider', formData.image[0]);
    const response = await dispatch(createNewSlider(formDataToSend));
    if (response.type === 'createNewSlider/fulfilled') {
      reset();
      return response;
    } else {
      throw new Error('Create Slider Error');
    }
  };
  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerCreateSlide}>
        <h1 className={styles.h1}>Create Slider</h1>
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <input {...register('title')} type="text" placeholder="title" />
          <input
            {...register('information')}
            type="text"
            placeholder="information"
          />
          <input type="text" placeholder="comment" {...register('comment')} />
          <input type="text" placeholder="author" {...register('author')} />
          <input type="file" placeholder="image" {...register('image')} />
          <button type="submit">Create Slide</button>
        </form>
        <div className={styles.containerSliders}>
          ew
        </div>
      </div>
    </section>
  );
};

export default ManageSlider;
