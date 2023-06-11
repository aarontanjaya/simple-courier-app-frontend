import React, { useState } from 'react';
import styles from './Input.module.scss';

type InputProps = React.ComponentProps<'input'>;
export default function Input({ className, name, ...props }: InputProps) {
  const [error, setError] = useState<boolean>(false);
  return (
    <>
      <input
        onInvalid={() => setError(true)}
        onInput={() => setError(false)}
        className={`${styles.input} ${className}`}
        name={name}
        {...props}
      />
      {error ? (
        <span
          className={`${styles.error}`}
        >{`Please insert ${name} value`}</span>
      ) : null}
    </>
  );
}
