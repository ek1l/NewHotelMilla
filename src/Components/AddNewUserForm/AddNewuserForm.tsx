/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './AddNewUser.module.scss';
import { useAppDispatch } from '../../redux/store';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAllusers } from '../../redux/reducers/getAllUsers';
import { addNewUserr } from '../../redux/reducers/addNewUser';
import { SchemaFormAddUserPanel } from '../../schemas/SchemaFormAddUserPanel';
import InputPanelAdmin from '../InputPanelAdmin/InputPanelAdmin';
interface IAddNewUserForm {
  email: string;
  password: string;
  username: string;
}
const notifySuccess = () => toast.success('User Created Successfully!');
const notifyError = () => toast.error('User Not Created!');

const AddNewUserForm = ({ handleModalAddNewUser }: any) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddNewUserForm>({
    resolver: zodResolver(SchemaFormAddUserPanel),
  });

  const submit = async (formData: IAddNewUserForm) => {
    // @ts-ignore
    const response = await dispatch(addNewUserr(formData));
    if (response.type === 'addNewUser/fulfilled') {
      handleModalAddNewUser();
      dispatch(getAllusers());
      notifySuccess();
      return response;
    } else {
      notifyError();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${styles.form} animation`}
    >
      <div className={styles.closeButton}>
        <button onClick={handleModalAddNewUser}>X</button>
      </div>
      <h1>Add new user</h1>
      <InputPanelAdmin
        errors={errors.username ? String(errors.username.message) : ''}
        {...register('username')}
        label="Username"
        type="text"
        width="50%"
        height="50%"
      />
      <InputPanelAdmin
        errors={errors.email ? String(errors.email.message) : ''}
        {...register('email')}
        label="E-mail"
        type="email"
        width="50%"
        height="50%"
      />
      <InputPanelAdmin
        errors={errors.password ? String(errors.password.message) : ''}
        {...register('password')}
        label="Password"
        type="password"
        width="50%"
        height="50%"
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddNewUserForm;
