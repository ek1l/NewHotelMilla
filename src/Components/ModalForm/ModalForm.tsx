/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import styles from './ModalForm.module.scss';
import { useAppDispatch } from '../../redux/store';
import { submitFormPost } from '../../redux/reducers/submitForm';
import { useState } from 'react';
import { sendEmailMailChimp } from '../../redux/reducers/sendEmail';
import { toggleModalFunction } from '../../redux/reducers/toggleModal';
import { toast } from 'react-toastify';

const ModalForm = () => {
  const [sendMailChimp, setSendMailChimp] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useAppDispatch();

  const submit = async (formData: any) => {
    reset();
    setTimeout(() => {
      dispatch(toggleModalFunction());
    }, 1500);
    const response = await dispatch(submitFormPost(formData));
    if (response.type === 'SubmitForm/post/fulfilled') {
      toast.success('Successfully sent email!');
    } else {
      toast.error('Error sending email!');
    }
    if (sendMailChimp) {
      const objMailChimp = {
        email: formData.email,
        fName: formData.name,
        lName: formData.clubName,
        phone: formData.phone,
      };
      const responseMailChimp = await dispatch(
        sendEmailMailChimp(objMailChimp),
      );
      if (responseMailChimp.type === 'sendEmailMailChimp/fulfilled') {
        toast.success('Successfully  adding to newsletter!');
      } else {
        toast.error(' Error adding to newsletter!');
      }
    }

    setSendMailChimp(false);
    return;
  };
  return (
    <div className={styles.containerModalForm}>
      <div className={styles.closeModal}>
        <button
          onClick={() => dispatch(toggleModalFunction())}
          className={styles.close}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Contact</h1>
        </div>
        <div className={styles.nameAndClub}>
          <label className={styles.label}>
            <span className={styles.labelSpan}>Name</span>
            <input {...register('name')} type="text" className={styles.input} />
          </label>
          <label className={styles.label}>
            <span className={styles.labelSpan}>Club</span>
            <input
              {...register('clubName')}
              type="text"
              className={styles.input}
            />
          </label>
        </div>

        <label className={styles.labelDefault}>
          <span className={styles.labelSpanDefault}>E-mail*</span>
          <input
            {...register('email')}
            type="text"
            className={styles.inputDefault}
          />
        </label>

        <label className={styles.labelDefault}>
          <span className={styles.labelSpanDefault}>Telephone</span>
          <input
            {...register('phone')}
            type="text"
            className={styles.inputDefault}
          />
        </label>

        <label className={styles.labelDefault}>
          <span className={styles.labelSpanDefault}>Message</span>
          <textarea
            {...register('message')}
            className={styles.textarea}
          ></textarea>
        </label>
        <label className={styles.labelCheck}>
          <input
            className={styles.inputCheck}
            onChange={() => {
              setSendMailChimp(!sendMailChimp);
            }}
            type="checkbox"
          />
          <span className={styles.labelSpanCheck}>Newsletter</span>
        </label>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ModalForm;
