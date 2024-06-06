/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddNewFacilitie.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import IMGEdit from '../../assets/img/editIco.svg';
import IMGDelete from '../../assets/img/deleteIco.svg';
import { toast } from 'react-toastify';

import FormEditFacilitie from '../FormEditFacilitie/FormEditFacilitie';

import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { createNewFacilitie } from '../../redux/reducers/createNewFacilitie';
import { setIdEditFacilitie } from '../../redux/reducers/editFacilitie';
import { deleteFacilities } from '../../redux/reducers/deleteFacilitie';

const notifySuccessDelete = () =>
  toast.success('Facilitie Deleted successfully');
const notifyErrorDelete = () => toast.error('Facilitie not Deleted');

const notifySuccessCreated = () =>
  toast.success('Facilitie Created successfully');
const notifyErrorCreated = () => toast.error('Facilitie not Created');

const AddNewFacilitie = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalFacilitieFormOpen, setFacilitieFormOpen] =
    useState<boolean>(false);
  const { data } = useAppSelector((state) => state.getAllFacilitiesSlice);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const handleDeleteFacilitie = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteFacilities(id));
    if (response.type === 'deleteFacilities/fulfilled') {
      notifySuccessDelete();
      dispatch(getAllFacilities());
      handleModal();
      return response;
    } else {
      notifyErrorDelete();
    }
  };

  const onSubmit = async (formData: any) => {
    const { facility, icon } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('facility', facility);
    formDataToSend.append('icon', icon[0]);
    const response = await dispatch(createNewFacilitie(formDataToSend));
    if (response.type === 'createNewFacilitie/fulfilled') {
      notifySuccessCreated();
      dispatch(getAllFacilities());
      handleModal();
      return response;
    } else {
      notifyErrorCreated();
    }
  };

  const handleGetIdEditFacilitie = (id: number) => {
    dispatch(setIdEditFacilitie(id));
    setFacilitieFormOpen(!modalFacilitieFormOpen);
  };

  const closeFacilitieModal = () => {
    setFacilitieFormOpen(false);
  };

  useEffect(() => {
    dispatch(getAllFacilities());
  }, [dispatch]);

  return (
    <div className={styles.containerCreateNewFacilitie}>
      <h2 onClick={handleModal}>Create new Facilitie</h2>
      {modalIsOpen && (
        <>
          <form
            className={`${styles.form} animationFormModal`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Name Facilitie"
              {...register('facility')}
            />
            <label>
              <span>Select the facilities icon</span>
              <input
                type="file"
                className={styles.inputFacilitie}
                {...register('icon')}
              />
            </label>
            <button className={styles.button} type="submit">
              Create Facilitie
            </button>
          </form>
          <div className={styles.containerFacilities}>
            {data.length > 0
              ? data.map((facilitie: any) => (
                  <div key={facilitie.id} className={styles.facilitie}>
                    <div className={styles.nameAndIcon}>
                      <img
                        src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                          facilitie.icon
                        }`}
                        alt="Facilitie icon"
                      />
                      <span>{facilitie.facility}</span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleGetIdEditFacilitie(facilitie.id)}
                        className={styles.buttonAction}
                      >
                        <img src={IMGEdit} alt="Edit Button" />
                      </button>
                      <button
                        onClick={() => handleDeleteFacilitie(facilitie.id)}
                        className={styles.buttonAction}
                      >
                        <img src={IMGDelete} alt="Edit Button" />
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </>
      )}
      {modalFacilitieFormOpen && (
        <div className={styles.containerEdit}>
          <FormEditFacilitie closeFacilitieModal={closeFacilitieModal} />
        </div>
      )}
    </div>
  );
};

export default AddNewFacilitie;
