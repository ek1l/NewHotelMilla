/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './AddNewTravelTime.module.scss';

import IMGDeleteButton from '../../assets/img/deleteIco.svg';
import { useForm } from 'react-hook-form';

import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { deleteTravelTime } from '../../redux/reducers/deleteTravelTime';
import { createTravelTime } from '../../redux/reducers/createNewTravelTime';

const AddNewTravelTime = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllTravelTimeSlice);
 
  const [handleModalIsOpen, setHandleModalIsOpen] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (formData: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    if (formData.travelTime === '') return;
    const response = await dispatch(createTravelTime(formData));

    if (response.type === 'createTravelTime/fulfilled') {
      reset();
      dispatch(getAllTravelTime());
      return;
    } else {
      return;
    }
  };

  const handleModal = () => {
    setHandleModalIsOpen(!handleModalIsOpen);
  };

  const handleDeleteTravelTime = async (id: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await dispatch(deleteTravelTime(id));

    if (response.type === 'deleteTravelTime/fulfilled') {
      dispatch(getAllTravelTime());
      reset();
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(getAllTravelTime());
  }, [dispatch]);
  return (
    <div className={styles.containerTravelTime}>
      <h2 onClick={handleModal}>Create new Travel Time</h2>
      {handleModalIsOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} animationFormModal`}
        >
          <input
            {...register('travel_time')}
            className={styles.input}
            type="text"
            placeholder="Travel Time"
          />
          <button className={styles.button} type="submit">
            Create Travel Time
          </button>
          {data.length > 0
            ? data.map((item: any) => (
                <div key={item.id} className={styles.travelTime}>
                  <span>{item.travel_time}</span>
                  <button onClick={() => handleDeleteTravelTime(item.id)}>
                    <img src={IMGDeleteButton} alt="Delete button" />
                  </button>
                </div>
              ))
            : null}
        </form>
      )}
    </div>
  );
};

export default AddNewTravelTime;
