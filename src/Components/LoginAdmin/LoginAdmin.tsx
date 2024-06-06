import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './LoginAdmin.scss';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';
import { loginAdminUser } from '../../redux/reducers/loginPanelAdmin';

const notifySuccess = () => toast.success('Successfully logged in');
const notifyError = () => toast.error('You are not an administrator');
const tokenNull = () => toast.error('Token is null');

type FormData = {
  email: string;
  password: string;
};

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<FormData>();

  const submit = useCallback(
    async (formData: FormData) => {
      const response = await dispatch(loginAdminUser(formData));
      if (response.type === 'loginAdminuser/fulfilled') {
        notifySuccess();
        setTimeout(() => navigate('/admin/login/panel'), 1000);
      } else {
        notifyError();
        localStorage.clear();
      }
    },
    [dispatch, navigate],
  );

  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      tokenNull();
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyTokenIsValid();
    }
  }, [verifyTokenIsValid]);

  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <ToastContainer closeOnClick autoClose={2000} />
      <div className="title">
        LOGIN
        <br />
        <span>Enter details to enter</span>
      </div>
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        name="email"
        className="input"
      />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        name="password"
        className="input"
      />
      <button type="submit" className="button-confirm">
        Let's go →
      </button>
    </form>
  );
};

export default LoginAdmin;
