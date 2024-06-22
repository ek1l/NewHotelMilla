/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from 'react-hook-form';
import styles from './EdituserForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SchemaFormEditUser } from '../../schemas/SchemaFromEditUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAllusers } from '../../redux/reducers/getAllUsers';
import { editUser } from '../../redux/reducers/editUser';
import { getOneUserId } from '../../redux/reducers/getOneUser';

interface IInputs {
  username: string;
  email: string;
  password: string;
  role: string;
}

const notifySuccess = () => toast.success('User Edited Successfully!');
const notifyError = () => toast.error('User Not Edited!');
// @ts-ignore
const EditUserForm = ({ handleModalEditUserClose }: any) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getOneUserSlice);

  const { idUserEdit } = useAppSelector((state) => state.editUserSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: zodResolver(SchemaFormEditUser),
    values: {
      username: data.length > 0 ? data[0]?.username : '',
      email: data.length > 0 ? data[0]?.email : '',
      password: '',
      role: data.length > 0 ? data[0]?.role : 'user',
    },
  });

  const submit = async (formData: IInputs) => {
    const formDataAndId = {
      id: idUserEdit,
      formData: { ...formData },
    };

    const response = await dispatch(editUser(formDataAndId));

    if (response.type === 'editUser/fulfilled') {
      notifySuccess();
      dispatch(getAllusers());
      handleModalEditUserClose();
    } else {
      notifyError();
    }
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getOneUserId(idUserEdit));
  }, [dispatch, idUserEdit]);
 
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${styles.form} animation`}
    >
      {data.length > 0 ? (
        <>
          <div className={styles.closeButton}>
            <button type="button" onClick={handleModalEditUserClose}>
              X
            </button>
          </div>
          <h1>Edit User</h1>
          <input {...register('username')} type="text" autoComplete="off" />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
          <input {...register('email')} type="email" autoComplete="off" />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
          <input
            placeholder="Password"
            {...register('password')}
            type="password"
            autoComplete="off"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          <select {...register('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className={styles.error}>{errors.role.message}</p>}
          <button type="submit">Edit</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </form>
  );
};

export default EditUserForm;
