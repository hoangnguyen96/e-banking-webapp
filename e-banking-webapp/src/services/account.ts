// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import {
  AccountType,
  GlobalAccount,
  IAccount,
  IUser,
  SuccessResponse,
} from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const getAccountsByUserId = async (
  userId: number,
): Promise<IAccount[]> => {
  const response = await httpClient.get<IUser>(
    `${API_ENDPOINTS.USERS}/${userId}?populate=accounts`,
  );

  if (response?.data?.accounts) {
    return response.data.accounts;
  }

  return [];
};

export const getAccountInfoByAccountType = async (
  userId: number,
  accountType: AccountType,
  fieldName: keyof IAccount,
): Promise<string | number | boolean | null> => {
  const accounts = await getAccountsByUserId(userId);

  const accountFound = accounts.find((account) => account.type === accountType);

  if (!accountFound || !(fieldName in accountFound)) {
    return null;
  }

  const fieldValue = accountFound[fieldName];
  if (
    typeof fieldValue === 'string' ||
    typeof fieldValue === 'number' ||
    typeof fieldValue === 'boolean'
  ) {
    return fieldValue;
  }

  return null;
};

export const getGlobalAccounts = async (): Promise<
  SuccessResponse<GlobalAccount[]>
> => {
  const response = await httpClient.get<GlobalAccount[]>(
    API_ENDPOINTS.GLOBAL_ACCOUNTS,
  );

  return response.data;
};
