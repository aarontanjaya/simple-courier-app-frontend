import React from 'react';
import styles from './Headerbar.module.scss';
type HeaderbarProps = React.ComponentProps<'div'>;
export default function Headerbar({ children, ...props }: HeaderbarProps) {
  return (
    <div className={`${styles.header}`} {...props}>
      {children}
    </div>
  );
}
