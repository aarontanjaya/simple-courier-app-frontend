import React, { useState } from 'react';
import styles from './TextArea.module.scss';

type TextAreaProps = React.ComponentProps<'textarea'>;
export default function TextArea({ className, name, ...props }: TextAreaProps) {
  const [error, setError] = useState<boolean>(false);
  return (
    <>
      <textarea
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