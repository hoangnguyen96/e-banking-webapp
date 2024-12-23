'use client';

// Libs
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';

// Models
import { IAccountPayloadData, TransactionCreateData } from '@/interfaces';

// API
import { createTransaction, updateAccountInfo } from '@/actions';

// Helpers / Utils
import { GlobalTransferFormSchema } from '@/schemas';
import { convertToUSD, formatNumberWithCommas } from '@/utils';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import {
  GlobalTransferForm,
  ConfirmGlobalTransfer,
  GlobalTransferSuccess,
} from '@/components';

type FormValues = z.infer<typeof GlobalTransferFormSchema>;

interface IGlobalTransferSteps {
  session: Session;
  onClose?: () => void;
}

export const GlobalTransferSteps = ({
  session,
  onClose,
}: IGlobalTransferSteps) => {
  const form = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      fromAccountType: undefined,
      fromCountryType: undefined,
      amount: 0,
    },
    resolver: zodResolver(GlobalTransferFormSchema),
  });

  const allFieldValues = form.watch();

  const amountInUSD = formatNumberWithCommas(
    convertToUSD(allFieldValues.fromCountryType, allFieldValues.amount),
  );

  const submitHandler = async (data: FormValues) => {
    const transactionData: TransactionCreateData = {
      fromAccountId: data.fromAccountId,
      toAccountId: '',
      fromAccountType: data.fromAccountType,
      toAccountType: undefined,
      statusTransaction: true,
      amount: Number(data.amount),
    };

    const payload: IAccountPayloadData = {
      name: data.fromCardName,
      accountNumber: data.fromAccountNumber,
      balance: data.fromAccountBalance - Number(data.amount),
      type: data.fromAccountType,
      currency: '$',
    };

    await createTransaction(transactionData);
    await updateAccountInfo(data.fromAccountId, payload);
  };

  return (
    <WizardForm.Root
      schema={GlobalTransferFormSchema}
      form={form}
      className='flex grow flex-col'
    >
      <WizardForm.Step name='transfer' key='transfer'>
        <GlobalTransferForm session={session} />
      </WizardForm.Step>
      <WizardForm.Step
        name='confirm'
        key='confirm'
        className='flex grow flex-col items-center justify-center'
      >
        <ConfirmGlobalTransfer
          {...allFieldValues}
          submitHandler={submitHandler}
          amountInUSD={amountInUSD}
          userName='Yehudi Daud'
        />
      </WizardForm.Step>
      <WizardForm.Step
        name='success'
        key='success'
        className='flex grow flex-col items-center justify-center'
      >
        <GlobalTransferSuccess
          {...allFieldValues}
          onClose={onClose}
          userName='Yehudi Daud'
        />
      </WizardForm.Step>
    </WizardForm.Root>
  );
};
