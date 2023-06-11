import React from 'react';
import styles from './Form.module.scss';

type FormProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
} & React.ComponentProps<'form'>;

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={`${styles.form} ${className}`} action='' {...props}>
      {children}
    </form>
  );
}
