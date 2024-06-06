/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from 'react-toastify';
import styles from './AddNewCountry.module.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import IMGEdit from '../../assets/img/editIco.svg';
import IMGDelete from '../../assets/img/deleteIco.svg';
import { createNewCountry } from '../../redux/reducers/createNewCountry';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { editCountry } from '../../redux/reducers/editCountry';
import { deleteCountry } from '../../redux/reducers/deleteCountry';

interface IInputForm {
  name: string;
}

const notifySuccess = () => toast.success('Country created successfully');
const notifyError = () => toast.error('Country not created');

const notifySuccessDeleted = () =>
  toast.success('Country deleted successfully');
const notifyErrorDeleted = () => toast.error('Country not Deleted');

const notifySuccessEdit = () => toast.success('Country edited successfully');
const notifyErrorEdit = () => toast.error('Country not Edited');

const AddNewCountry = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllCountrySlice);
  const { handleSubmit, register, reset } = useForm<IInputForm>();
  const [editingCountryId, setEditingCountryId] = useState<number | null>(null);
  const [inputEditValue, setInputEditValue] = useState<string>('');
  const [openFormNewCountry, setOpenFormNewCountry] = useState<boolean>(false);

  const submit = async (formData: IInputForm) => {
    const response = await dispatch(createNewCountry(formData));
    if (response.type === 'createNewCountry/fulfilled') {
      notifySuccess();
      reset({ name: '' });
      dispatch(getAllCountry());
      return;
    } else {
      notifyError();
    }
  };

  const handleEditButtonClick = (countryId: number) => {
    setEditingCountryId(countryId);
  };

  const handleSubmitEdit = async () => {
    // @ts-ignore
    const idAndNameUpdate = {
      id: editingCountryId,
      value: {
        name: inputEditValue,
      },
    };
    // @ts-ignore
    const response = await dispatch(editCountry(idAndNameUpdate));

    if (response.type === 'editCountry/fulfilled') {
      notifySuccessEdit();
      setEditingCountryId(null);
      setInputEditValue('');
      dispatch(getAllCountry());
      return response;
    } else {
      notifyErrorEdit();
    }
  };

  const handleDeleteCountry = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteCountry(id));
    if (response.type === 'deleteCountry/fulfilled') {
      notifySuccessDeleted();
      dispatch(getAllCountry());
      setOpenFormNewCountry(false);
      return response;
    } else {
      notifyErrorDeleted();
    }
  };

  useEffect(() => {
    dispatch(getAllCountry());
  }, [dispatch]);

  return (
    <div className={styles.containerCreateNewCountry}>
      <h2 onClick={() => setOpenFormNewCountry(!openFormNewCountry)}>
        Create new country
      </h2>
      {openFormNewCountry && (
        <>
          <form
            onSubmit={handleSubmit(submit)}
            className={`${styles.form} animationFormModal`}
          >
            <input
              {...register('name')}
              type="text"
              placeholder="Name Country"
              required
              className={styles.input}
            />
            <button className={styles.button}>Create Country</button>
          </form>
          <div className={styles.countries}>
            {data.map((country) => (
              <div key={country.id} className={styles.editExclude}>
                {editingCountryId === country.id ? (
                  <input
                    type="text"
                    className={`${styles.input} animationFormModal`}
                    placeholder={country.name}
                    value={inputEditValue}
                    onChange={(e) => setInputEditValue(e.target.value)}
                  />
                ) : (
                  <span className="animationFormModal">{country.name},</span>
                )}
                <div
                  className={`${styles.buttonsEditAndExclude} animationFormModal`}
                >
                  {editingCountryId === country.id ? (
                    <button
                      className={styles.sendEditBTN}
                      onClick={() => setEditingCountryId(null)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className={styles.edit}
                      onClick={() => handleEditButtonClick(country.id)}
                    >
                      <img src={IMGEdit} alt="Button Edit" />
                    </button>
                  )}
                  {editingCountryId !== country.id && (
                    <button
                      onClick={() => handleDeleteCountry(country.id)}
                      className={styles.exclude}
                    >
                      <img src={IMGDelete} alt="Button Edit" />
                    </button>
                  )}
                  {editingCountryId === country.id && (
                    <button
                      className={styles.sendEditBTN}
                      onClick={handleSubmitEdit}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewCountry;
