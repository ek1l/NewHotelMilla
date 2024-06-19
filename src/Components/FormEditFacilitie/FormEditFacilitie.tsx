/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Input from '../Input/Input';
import styles from './FormEditFacilitie.module.scss';
import { toast } from 'react-toastify';
 
 
import { useEffect } from 'react';
 
import { editFacilitie } from '../../redux/reducers/editFacilitie';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';

const notifySuccessEdited = () =>
  toast.success('Facilitie Edited successfully');
const notifyErrorEdited = () => toast.error('Facilitie not Edited');

const FormEditFacilitie = ({
  closeFacilitieModal,
}: {
  closeFacilitieModal: () => void;
}) => {
  const { idEditFacilitie } = useAppSelector(
    (state) => state.editFacilitieSlice,
  );
  const { data } = useAppSelector((state) => state.getOneFacilitieSlice);

  const dispatch = useAppDispatch();
  const onSubmit = async (formData: any) => {
    const { facility, icon } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('facility', facility);
    formDataToSend.append('icon', icon[0]);
    // @ts-ignore
    const response = await dispatch(
      // @ts-ignore
      editFacilitie({ id: idEditFacilitie, value: formDataToSend }),
    );
    if (response.type === 'editFacilitie/fulfilled') {
      notifySuccessEdited();
      dispatch(getAllFacilities());
      closeFacilitieModal();
      return response;
    } else {
      notifyErrorEdited();
    }
  };
 
  const { handleSubmit, register } = useForm({
    values: {
      // @ts-ignore
      facility: data[0]?.facility,
      icon: '',
    },
  });
  useEffect(() => {
    // @ts-ignore
    dispatch(getOneFacilitie(idEditFacilitie));
  }, [dispatch, idEditFacilitie]);
  return (
    <div className={`${styles.containerFacilitieForm} animationFormModal`}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>
          <h3>Edit Facilitie</h3>
          <button onClick={closeFacilitieModal}>X</button>
        </div>
        <Input
          {...register('facility')}
          label="Name"
          type="text"
          width="100%"
        />
        <Input
          {...register('icon')}
          label="Icon"
          type="file"
          width="100%"
          height="100%"
        />
        <button className={styles.submitButton} type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default FormEditFacilitie;
