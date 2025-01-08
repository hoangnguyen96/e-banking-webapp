// Interfaces
import { CurrencyUnit, ICard, ITransaction } from '@/interfaces';

export enum AccountType {
  MAIN = 'Main',
  SAVINGS = 'Savings',
  CHECKINGS = 'Checkings',
}

export interface IAccount {
  id: number;
  documentId: string;
  accountNumber: string;
  balance: number;
  type: string;
  currency: string;
  transactions?: ITransaction[];
  cards?: ICard[];
  name: string;
  currencyUnit?: CurrencyUnit;
  user?: number;
}

export interface IAccountPayloadData
  extends Omit<IAccount, 'id' | 'documentId' | 'transactions' | 'cards'> {}

export interface IAccountPayload {
  data: IAccountPayloadData;
}

export interface Preferences {
  announcements: boolean;
  updates: boolean;
  feedbacksAndSurvey: boolean;
  events: boolean;
  generalNotification: boolean;
  promotions: boolean;
  eventsNearMe: boolean;
}
