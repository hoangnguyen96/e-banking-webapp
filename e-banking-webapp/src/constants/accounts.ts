// Interfaces
import { AccountType } from '@/interfaces';

export const ACCOUNT_TYPES = {
  MAIN_WALLET: 'Main Wallet',
  SAVINGS: 'Savings',
  CHECKINGS: 'Checkings',
};

export const TRANSFER_FORM_ACCOUNT_OPTIONS = [
  {
    key: AccountType.MAIN,
    label: 'Main Account',
  },
  {
    key: AccountType.SAVINGS,
    label: 'Savings',
  },
  {
    key: AccountType.CHECKINGS,
    label: 'Checkings',
  },
];
