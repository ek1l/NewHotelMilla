/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef } from 'react';
import styles from './InputTextArea.module.scss';

interface IInputTextArea {
  errors?: string;
  label?: string;
}

const InputTextArea = (
  { label = 'Message', errors, ...props }: IInputTextArea,
  ref: LegacyRef<HTMLTextAreaElement> | undefined,
) => {
  return (
    <label className={styles.label}>
      <span>{label}*</span>
      <textarea {...props} ref={ref}></textarea>
      <div className={styles.errorsContainer}>
        {errors && <p className={styles.error}>{errors}</p>}
      </div>
    </label>
  );
};

export default forwardRef(InputTextArea);
