/* eslint-disable react-refresh/only-export-components */
import React, { LegacyRef, forwardRef } from 'react';
import styles from './InputpanelAdmin.module.scss';

interface InputProps {
  label: string;
  type: string;
  width?: string;
  errors?: string;
  height?: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

const InputPanelAdmin = (
  {
    label,
    type,
    width = '412px',
    errors,
    height = '66px',
    accept,
    multiple,
    ...props
  }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) => {
  return (
    <>
      <label
        style={{ width: `${width}`, height: `${height}` }}
        className={styles.label}
      >
        <span>{label}*</span>
        <input
          multiple={multiple}
          accept={accept}
          type={type}
          name={type}
          {...props}
          ref={ref}
        />
        <div className={styles.errorsContainer}>
          {errors && <p className={styles.error}>{errors}</p>}
        </div>
      </label>
    </>
  );
};

export default forwardRef(InputPanelAdmin);
