import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './NotifyEmail.module.scss';
import { EmailSend } from '../../interfaces/emailSendInterface';
import { emailSendSchema } from '../../schemas/emailSend';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sendEmailMailChimp } from '../../redux/reducers/sendEmail';
import { toast } from 'react-toastify';
import { notifyEmailSend } from '../../redux/reducers/notifyEmailSend';

const NotifyEmail = () => {
  const notify = () => toast.success('Email successfully sent!');
  const notifyError = () => toast.error('Email Invalid!');
  const notifyErrorSend = () => toast.error('Email not sent!');
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.sendEmailMailChimpSlice);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EmailSend>({
    resolver: zodResolver(emailSendSchema),
  });
  const submit = async (formData: EmailSend) => {
    const response = await dispatch(sendEmailMailChimp(formData));
    if (response.type === 'sendEmailMailChimp/fulfilled') {
      notify();
      reset();
      dispatch(notifyEmailSend());
      return;
    } else {
      notifyErrorSend();
      reset();
      return;
    }
  };
  const closeModalSendEmail = () => dispatch(notifyEmailSend());
  useEffect(() => {
    if (errors.email) {
      notifyError();
    }
  }, [errors]);
  return (
    <div className={`${styles.containerNotifyEmail} animationNotifySendEmail`}>
      <div className={styles.notifyEmail}>
        <div className={styles.closeModalContainer}>
          <button className={styles.buttonClosed} onClick={closeModalSendEmail}>
            X
          </button>
        </div>
        <div className={styles.titleAndInput}>
          <h1 className={styles.title}>
            Meld je aan voor onze nieuwsbrief en blijf op de hoogte!
          </h1>
          <form
            onSubmit={handleSubmit(submit)}
            className={styles.buttonAndInput}
          >
            <input
              {...register('email')}
              className={styles.input}
              type="text"
              placeholder="Enter your email"
            />
            {loading ? (
              <button disabled className={styles.button}>
                Loading...
              </button>
            ) : (
              <button className={styles.button}>Subscribe</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotifyEmail;
