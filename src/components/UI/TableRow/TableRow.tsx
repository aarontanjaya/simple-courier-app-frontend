import React from 'react';
import { TableColumn } from '../TableHeader/TableHeader';
import styles from './TableRow.module.scss';
export type RowItem = { [key: string]: React.ReactNode };
export type TableRowProps = {
  rowKey: string | number;
  dataSource: RowItem;
  headers: TableColumn[];
} & React.ComponentProps<'tr'>;
export default function TableRow({
  dataSource,
  headers,
  rowKey,
  className = '',
  ...props
}: TableRowProps) {
  return (
    <tr className={`${className} ${styles.table__row}`} {...props}>
      {headers.map((item) => (
        <td className={`${styles.row__item}`} key={`${rowKey}-${item.title}`}>
          {dataSource[item.index]}
        </td>
      ))}
    </tr>
  );
}
