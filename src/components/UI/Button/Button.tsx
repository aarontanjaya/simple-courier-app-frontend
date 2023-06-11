import React from 'react';
import styles from './Button.module.scss';
type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'border';
type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
} & React.ComponentProps<'button'>;

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={` ${className} ${styles.button} ${styles[variant]} `}
      {...props}
    >
      {children}
    </button>
  );
}
