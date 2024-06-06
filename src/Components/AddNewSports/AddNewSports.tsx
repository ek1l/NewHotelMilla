/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './AddNewSports.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import IMGDeleteIcon from '../../assets/img/deleteIco.svg';
import { toast } from 'react-toastify';
import { getAllSports } from '../../redux/reducers/getAllSports';
import { deleteSport } from '../../redux/reducers/deleteSport';
import { createNewSport } from '../../redux/reducers/createNewSport';

const notifySuccessCreated = () => toast.success('Sport Created successfully');
const notifyErrorCreated = () => toast.error('Sport not Created');

const notifySuccessDeleted = () => toast.success('Sport Deleted successfully');
const notifyErrorDeleted = () => toast.error('Sport not Deleted');

const AddNewSports = () => {
  const [handleModalIsOpen, setHandleModalIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllSportsSlice);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (formData: any) => {
    if (formData.sport === '') return;

    const response = await dispatch(createNewSport(formData));
    if (response.type === 'createNewSport/fulfilled') {
      notifySuccessCreated();
      dispatch(getAllSports());
      reset();
      return response;
    } else {
      notifyErrorCreated();
    }
  };

  const handleDeleteSport = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteSport(id));
    if (response.type === 'deleteSport/fulfilled') {
      notifySuccessDeleted();
      dispatch(getAllSports());
      reset();
      return;
    } else {
      notifyErrorDeleted();
    }
  };

  const handleModal = () => {
    setHandleModalIsOpen(!handleModalIsOpen);
  };
  useEffect(() => {
    dispatch(getAllSports());
  }, [dispatch]);

  return (
    <div className={styles.containerSports}>
      <h2 onClick={handleModal}> Create new Sports</h2>
      {handleModalIsOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} animationFormModal`}
        >
          <input
            {...register('sport')}
            className={styles.input}
            type="text"
            placeholder="Sport"
          />
          <button type="submit" className={styles.button}>
            Create new Sport
          </button>
          {data.length > 0
            ? data.map((sport) => (
                <div key={sport.id} className={styles.sport}>
                  <span>{sport.sport}</span>
                  <button
                    onClick={() => handleDeleteSport(sport.id)}
                    className={styles.buttonDelete}
                  >
                    <img src={IMGDeleteIcon} alt="Delete IMG" />
                  </button>
                </div>
              ))
            : null}
        </form>
      )}
    </div>
  );
};

export default AddNewSports;
