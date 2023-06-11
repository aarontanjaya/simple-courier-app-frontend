import React from 'react';
import Label from '../Label/Label';
import styles from './FormItem.module.scss';
type FormItemProps = {
  label?: string;
  children: React.ReactNode;
} & React.ComponentProps<'div'>;

export default function FormItem({
  children,
  label,
  className,
  ...props
}: FormItemProps) {
  return (
    <div className={`${styles.form__item} ${className}`} {...props}>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  );
}
