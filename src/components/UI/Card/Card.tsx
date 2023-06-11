import React from 'react';
import styles from './Card.module.scss';

type CardProps = React.ComponentProps<'div'>;
export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
}
