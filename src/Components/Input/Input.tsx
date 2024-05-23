/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, LegacyRef } from 'react';
import styles from './Input.module.scss';

const Input = (
  { type, placeholder, error, label, ...props }: any,
  ref: LegacyRef<HTMLInputElement> | undefined,
) => {
  return (
    <div className={styles.flexInput}>
      <label className={styles.label}>
        <span className={styles.labelInput}>{label}</span>
        <input
          className={styles.input}
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </label>
      {error ? <p className={styles.error}>{error.message}</p> : null}
    </div>
  );
};

export default forwardRef(Input);
