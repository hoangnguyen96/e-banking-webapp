'use client';

// Constants
import {
  TRANSFER_RECEIVED_TABLE_COLUMNS,
  TRANSFER_SENT_TABLE_COLUMNS,
} from '@/constants';

// Interfaces
import { ITransaction, TransferType } from '@/interfaces';

// Components
import { Table } from '@/components';

// Utils
import { formatDate, formatNumberWithCommas } from '@/utils';

interface ITransferTableProps {
  transactions: ITransaction[];
  transferType: TransferType;
}

export const TransferTable = ({
  transactions,
  transferType,
}: ITransferTableProps) => {
  const isTransferReceived = transferType === TransferType.RECEIVED;

  const transferTableColumns = isTransferReceived
    ? TRANSFER_RECEIVED_TABLE_COLUMNS
    : TRANSFER_SENT_TABLE_COLUMNS;

  const columns = transferTableColumns.map((column) => {
    switch (column.key) {
      case 'createdAt':
        column.renderCell = (item) => <>{formatDate(item.createdAt)}</>;
        break;
      case 'status':
        column.renderCell = (item) => (
          <>{item.statusTransaction ? 'Approved' : 'Declined'}</>
        );
        break;
      case 'amount':
        column.renderCell = (item) => (
          <>
            {item.currencyUnit ?? '$'}
            {formatNumberWithCommas(item.amount)}
          </>
        );
        break;
      default:
        column.renderCell = null;
        break;
    }
    return column;
  });

  return (
    <Table
      columns={columns}
      data={transactions}
      removeWrapper
      radius='none'
      classNames={{
        tbody:
          'divide-y divide-semiTransparentNavyBlue border-[0.2px] border-semiTransparentNavyBlue ',
        thead: '[&>tr:last-child]:hidden',
        th: 'last:rounded-none first:rounded-none text-primary-200 font-semibold',
      }}
    />
  );
};
