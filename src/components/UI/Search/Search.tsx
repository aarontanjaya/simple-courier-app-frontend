import React from 'react';
import styles from './Search.module.scss';
export type SearchProps = React.ComponentProps<'input'>;

export default function Search({ className,type='text', ...props }: SearchProps) {
  return (
    <input className={`${styles.search} ${className}`} type={type} {...props} />
  );
}
