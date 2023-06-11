import React from 'react';
import Currency from '../UI/Currency/Currency';
import styles from './CostViewer.module.scss';
type CostViewerProps = {
  locales: string | string[];
  currency: string;
  sizeCost: number;
  categoryCost: number;
  addonsCost: number;
} & React.ComponentProps<'div'>;
export default function CostViewer({
  locales,
  currency,
  sizeCost,
  categoryCost,
  addonsCost,
}: CostViewerProps) {
  return (
    <div className={`${styles.sum__container}`}>
      <div className={`${styles.sum__item}`}>
        <p>Size Cost</p>
        <Currency locales={locales} currency={currency} value={sizeCost} />
      </div>
      <div className={`${styles.sum__item}`}>
        <p>Category Cost</p>
        <Currency locales={locales} currency={currency} value={categoryCost} />
      </div>
      <div className={`${styles.sum__item}`}>
        <p>Add-ons Cost</p>
        <Currency locales={locales} currency={currency} value={addonsCost} />
      </div>
      <div className={`${styles.sum__item}`}>
        <p className={styles.total}>Total Cost</p>
        <Currency
          className={styles.total}
          locales='en-ID'
          currency='IDR'
          value={sizeCost + categoryCost + addonsCost}
        />
      </div>
    </div>
  );
}
