import { useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './ManageFilters.module.scss';
import AddNewCities from '../AddNewCities/AddNewCities';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import AddNewTravelTime from '../AddNewTravelTime/AddNewTravelTime';
import AddNewCondition from '../AddNewCondition/AddNewCondition';
import AddNewSports from '../AddNewSports/AddNewSports';
import AddNewRating from '../AddNewRating/AddNewRating';
import AddNewCountry from '../AddNewCountry/AddNewCountry';
import AddNewFacilitie from '../AddNewFacillitie/AddNewFacilitie';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';

const ManageFilters = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyTokenIsValid();
    } else {
      navigate('/');
      localStorage.clear();
    }
  }, [verifyTokenIsValid, navigate]);

  return (
    <section className={styles.sectionManageFilters}>
      <div className={styles.container}>
        <AddNewCountry />
        <AddNewCities />
        <AddNewFacilitie />
        <AddNewCondition />
        <AddNewTravelTime />
        <AddNewSports />
        <AddNewRating />
        <ToastContainer closeOnClick autoClose={2000} />
      </div>
    </section>
  );
};

export default ManageFilters;
