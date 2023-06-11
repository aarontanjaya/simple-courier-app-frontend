import React from 'react';

type CurrencyProps = {
  locales: string | string[];
  currency: string;
  value: number|undefined|null;
} & React.ComponentProps<'p'>;
export default function Currency({locales, currency,value, className, ...props}: CurrencyProps) {
  return (
    <p className={`${className ? className: ''}`} {...props}>
      {value? new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 3,
      }).format(value):new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 3,
      }).format(0)}
    </p>
  );
}
