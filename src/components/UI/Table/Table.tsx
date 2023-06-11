import React from 'react';
import TableHeader from '../TableHeader/TableHeader';
import { TableColumn } from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';
import { RowItem } from '../TableRow/TableRow';
import styles from './Table.module.scss';
export type TableProps = {
  dataSource: RowItem[];
  headers: TableColumn[];
} & React.ComponentProps<'table'>;
export default function Table({
  dataSource,
  headers,
  className,
  ...props
}: TableProps) {
  return (
    <table className={`${styles.table} ${className}`} {...props}>
      <thead>
        <TableHeader dataSource={headers} />
      </thead>
      <tbody>
        {dataSource.map((item, idx) => (
          <TableRow
            dataSource={item}
            headers={headers}
            key={idx}
            rowKey={idx}
          />
        ))}
      </tbody>
    </table>
  );
}
