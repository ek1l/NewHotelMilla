import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './ManageUsers.module.scss';

import { useNavigate } from 'react-router-dom';

import DeleteUserIcon from '../../assets/img/deleteIco.svg';
import EditUserIcon from '../../assets/img/editIco.svg';
import { ToastContainer, toast } from 'react-toastify';

import { getAllusers } from '../../redux/reducers/getAllUsers';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';
import { deleteUser } from '../../redux/reducers/deleteUser';
import AddNewUserForm from '../AddNewUserForm/AddNewuserForm';
import EditUserForm from '../EditUserForm/EditUserForm';
import { getIdUserEdit } from '../../redux/reducers/editUser';

const notifySuccess = () => toast.success('User Deleted Successfully!');
const notifyError = () => toast.error('User Not Deleted!');

const ManageUsers = () => {
  const [formAddNewUserActive, setFormAddNewUserActive] =
    useState<boolean>(false);
  const [formEditUserActive, setFormEditUserActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllusersSlice);

  const handleDeleteUser = useCallback(
    async (id: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await dispatch(deleteUser(id));

      if (response.type === 'deleteUser/fulfilled') {
        notifySuccess();
        dispatch(getAllusers());
      } else {
        dispatch(getAllusers());
        notifyError();
      }
    },
    [dispatch],
  );

  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleModalAddNewUser = useCallback(() => {
    setFormAddNewUserActive((prevState) => !prevState);
  }, []);

  const handleModalEditUser = useCallback(
    (id: number) => {
      setFormEditUserActive((prevState) => !prevState);
      if (id) {
        dispatch(getIdUserEdit(id));
      }
    },
    [dispatch],
  );

  const handleModalEditUserClose = useCallback(() => {
    setFormEditUserActive(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyTokenIsValid();
      dispatch(getAllusers());
    } else {
      navigate('/');
      localStorage.clear();
    }
    return () => {};
  }, [dispatch, navigate, verifyTokenIsValid]);

  return (
    <section className={`${styles.section} animation`}>
      {data.length > 0 && <h1>Users:</h1>}

      {!formAddNewUserActive && !formEditUserActive && (
        <button onClick={handleModalAddNewUser}>Add User</button>
      )}

      {formAddNewUserActive && (
        <div className={styles.addNewFormUserContainer}>
          <AddNewUserForm handleModalAddNewUser={handleModalAddNewUser} />
        </div>
      )}

      {formEditUserActive && (
        <div className={styles.editFormUserContainer}>
          <EditUserForm handleModalEditUserClose={handleModalEditUserClose} />
        </div>
      )}

      {!formAddNewUserActive && !formEditUserActive && (
        <div className={styles.usersList}>
          {data.length > 0 &&
            data.map((user) => (
              <div key={user.id} className={styles.cardUser}>
                <h3>ID: {user.id}</h3>
                <h3>Username: {user.username}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Role: {user.role}</h3>
                <div className={styles.actions}>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <img src={DeleteUserIcon} alt="DeleteIco" />
                  </button>
                  <button onClick={() => handleModalEditUser(user.id)}>
                    <img src={EditUserIcon} alt="EditIco" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      <ToastContainer closeOnClick autoClose={2000} />
    </section>
  );
};

export default ManageUsers;
