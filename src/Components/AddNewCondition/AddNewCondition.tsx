/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from 'react-hook-form';
import styles from './AddNewCondition.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import IMGDelete from '../../assets/img/deleteIco.svg';

import { toast } from 'react-toastify';

import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { createConditions } from '../../redux/reducers/createnewCondition';
import { deleteCondition } from '../../redux/reducers/deleteCondition';

const notifySuccessDelete = () =>
  toast.success('Condition Deleted successfully');
const notifyErrorDelete = () => toast.error('Condition not Deleted');

const notifySuccessCreate = () =>
  toast.success('Condition Created successfully');
const notifyErrorsCreate = () => toast.error('Condition not Created');

const AddNewCondition = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllConditionSlice);

  const [modalFormIsOpen, setModalFormIsOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (formData: any) => {
    if (formData.condition === '') return;
    const response = await dispatch(createConditions(formData));

    if (response.type === 'createConditions/fulfilled') {
      notifySuccessCreate();
      dispatch(getAllCondition());
      reset();
      return;
    } else {
      notifyErrorsCreate();
    }
  };

  const handleModal = () => {
    setModalFormIsOpen(!modalFormIsOpen);
  };

  const handleDelete = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteCondition(id));
    if (response.type === 'deleteCondition/fulfilled') {
      notifySuccessDelete();
      dispatch(getAllCondition());
      reset();
      return;
    } else {
      notifyErrorDelete();
    }
  };

  useEffect(() => {
    dispatch(getAllCondition());
  }, [dispatch]);
  return (
    <div className={styles.conditionContainer}>
      <h2 onClick={handleModal}> Create new Condition</h2>
      {modalFormIsOpen && (
        <form
          className={`${styles.form} animationFormModal`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={styles.input}
            {...register('condition')}
            type="text"
            placeholder="Name"
          />
          <button className={styles.button}>Create Condition</button>
          {data.length > 0
            ? data.map((item) => (
                <div key={item.id} className={styles.conditionDiv}>
                  <span className={styles.span}>{item.condition}</span>
                  <button onClick={() => handleDelete(item.id)}>
                    <img src={IMGDelete} alt="Delete" />
                  </button>
                </div>
              ))
            : null}
        </form>
      )}
    </div>
  );
};

export default AddNewCondition;
