/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from 'react-toastify';
import styles from './AddNewCities.module.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import IMGEdit from '../../assets/img/editIco.svg';
import IMGDelete from '../../assets/img/deleteIco.svg';

import { editCity } from '../../redux/reducers/editCity';
import { deleteCity } from '../../redux/reducers/deleteCity';
import { createCity } from '../../redux/reducers/createNewCity';
import { getAllCountry } from '../../redux/reducers/getAllCountry';

interface IInputForm {
  name: string;
}

const notifySuccess = () => toast.success('City created successfully');
const notifyError = () => toast.error('City not created');

const notifySuccessDelete = () => toast.success('City Deleted successfully');
const notifyErrorDelete = () => toast.error('City not deleted');

const notifySuccessEdit = () => toast.success('City Edit successfully');
const notifyErrorEdit = () => toast.error('City not Edit');

const AddNewCities = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllCountrySlice);
  const { handleSubmit, register, reset } = useForm<IInputForm>();
  const [openFormNewCountry, setOpenFormNewCountry] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [editingCityId, setEditingCityId] = useState<number | null>(null);
  const [editingCityCountryId, setEditingCityCountryId] = useState<
    number | null
  >(null);

  const [inputEditValue, setInputEditValue] = useState<string>('');

  const handleOpenForm = () => {
    setOpenFormNewCountry(!openFormNewCountry);
  };

  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const submit = async (formData: IInputForm) => {
    if (!selectedCity) {
      notifyError();
      return;
    }

    const response = await dispatch(
      createCity({ ...formData, countryId: Number(selectedCity) }),
    );
    if (response.type === 'createCity/fulfilled') {
      notifySuccess();
      handleOpenForm();
      reset({ name: '' });
      setSelectedCity(null);
    } else {
      notifyError();
      handleOpenForm();
    }
  };

  const handleDelete = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteCity(id));
    if (response.type === 'deleteCity/fulfilled') {
      notifySuccessDelete();
      dispatch(getAllCountry());
      handleOpenForm();
      return response;
    } else {
      notifyErrorDelete();
    }
  };

  const handleSubmitEdit = async () => {
    // @ts-ignore
    const idAndNameUpdate = {
      id: editingCityId,
      value: {
        countryId: editingCityCountryId,
        name: inputEditValue,
      },
    };

    // @ts-ignore
    const response = await dispatch(editCity(idAndNameUpdate));
    if (response.type === 'editCity/fulfilled') {
      notifySuccessEdit();
      setEditingCityId(null);
      setEditingCityCountryId(null);
      setInputEditValue('');
      dispatch(getAllCountry());
      return response;
    } else {
      notifyErrorEdit();
    }
  };

  const getIdAndCountryId = (id: number, countryId: number): any => {
    setEditingCityId(id);
    setEditingCityCountryId(countryId);
  };

  useEffect(() => {
    dispatch(getAllCountry());
  }, [openFormNewCountry, dispatch]);

  return (
    <div className={styles.containerCreateNewCountry}>
      <h2 onClick={handleOpenForm}>Create new City</h2>
      {openFormNewCountry && (
        <form
          onSubmit={handleSubmit(submit)}
          className={`${styles.form} animationFormModal`}
        >
          <div className={styles.selectLabel}>
            <label>Select a Country</label>
          </div>
          <select
            className={styles.countries}
            onChange={(e) => handleSelectCity(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select a Country
            </option>
            {data.length > 0 && openFormNewCountry
              ? data.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))
              : null}
          </select>
          {selectedCity && (
            <input
              {...register('name')}
              type="text"
              placeholder="Name City"
              required
              className={`${styles.input} animationFormModal`}
            />
          )}
          <button className={styles.button}>Create City</button>
        </form>
      )}
      <div className={styles.citiesContainer}>
        {data.length > 0 && openFormNewCountry
          ? data.map((country) =>
              country.cities.map((city) => (
                <div key={city.id} className={styles.editExclude}>
                  {editingCityId === city.id ? (
                    <input
                      type="text"
                      className={`${styles.input} animationFormModal`}
                      placeholder={city.name}
                      value={inputEditValue}
                      onChange={(e) => setInputEditValue(e.target.value)}
                    />
                  ) : (
                    <span className="animationFormModal">{city.name}, </span>
                  )}
                  <div
                    className={`${styles.buttonsEditAndExclude} animationFormModal`}
                  >
                    {editingCityId === city.id ? (
                      <>
                        <button
                          className={`${styles.sendEditBTN} animationFormModal`}
                          onClick={() => setEditingCityId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmitEdit}
                          className={`${styles.sendEditBTN} animationFormModal`}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.edit}
                          onClick={() => getIdAndCountryId(city.id, country.id)}
                        >
                          <img src={IMGEdit} alt="Edit" />
                        </button>
                        <button
                          onClick={() => handleDelete(city.id)}
                          className={styles.exclude}
                        >
                          <img src={IMGDelete} alt="Delete" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )),
            )
          : null}
      </div>
    </div>
  );
};

export default AddNewCities;
