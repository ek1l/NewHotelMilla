/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './AddNewRating.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import IMGIconDeletebutton from '../../assets/img/deleteIco.svg';

import { toast } from 'react-toastify';
import { deleteRating } from '../../redux/reducers/deleteRating';
import { getAllRatings } from '../../redux/reducers/getAllRating';
import { createNewRating } from '../../redux/reducers/createNewRating';

const notifySuccessCreate = () => toast.success('Rating Created successfully');
const notifyErrorCreate = () => toast.error('Rating not Created');

const notifySuccessDelete = () => toast.success('Rating Deleted successfully');
const notifyErrorDelete = () => toast.error('Rating not Deleted');

const AddNewRating = () => {
  const { data } = useAppSelector((state) => state.getAllRatingsSlice);
  const dispatch = useAppDispatch();
  const [openModalFormRating, setOpenModalFormRating] =
    useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm();
  const onSubmit = async (formData: any) => {
    const response = await dispatch(createNewRating(formData));

    if (response.type === 'createNewRating/fulfilled') {
      notifySuccessCreate();
      reset();
      setOpenModalFormRating(false);
      dispatch(getAllRatings());
    } else {
      notifyErrorCreate();
    }
  };
  const handleOpenModalFormRating = () => {
    setOpenModalFormRating(!openModalFormRating);
  };
  const handleDeleteRating = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteRating(id));

    if (response.type === 'deleteRating/fulfilled') {
      notifySuccessDelete();
      reset();
      dispatch(getAllRatings());
    } else {
      notifyErrorDelete();
    }
  };
  useEffect(() => {
    dispatch(getAllRatings());
  }, [dispatch]);
  return (
    <div className={styles.containerAddNewRating}>
      <h2 onClick={handleOpenModalFormRating}>Add New Rating</h2>
      {openModalFormRating && (
        <>
          <form
            className={`${styles.form} animationFormModal`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Rating"
              {...register('rating')}
            />

            <button className={styles.button} type="submit">
              Create Rating
            </button>
          </form>
          <div className={`${styles.containerRatingList} animationFormModal`}>
            {data.length > 0 ? (
              data.map((rating: any) => (
                <div key={rating.id} className={styles.ratingAndDelete}>
                  <p>{rating.rating}</p>
                  <button onClick={() => handleDeleteRating(rating.id)}>
                    <img src={IMGIconDeletebutton} alt="Icon Delete Button" />
                  </button>
                </div>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewRating;
