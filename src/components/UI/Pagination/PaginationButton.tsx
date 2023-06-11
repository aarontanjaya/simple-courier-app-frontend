import React from 'react';
import styles from './PaginationButton.module.scss';
type PaginationButtonProps = React.ComponentProps<'button'>;
export default function PaginationButton({
  children,
  disabled,
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${className} ${styles.button} ${styles[disabled ? 'disabled' : '']} `}
      {...props}
    >
      {children}
    </button>
  );
}
