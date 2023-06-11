import React from 'react';
import styles from './Label.module.scss';
type LabelProps = {
  children?: React.ReactNode;
} & React.ComponentProps<'label'>;

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  );
}
