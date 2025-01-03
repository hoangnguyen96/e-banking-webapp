'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import {
  SIGNUP_FORM_DEFAULT_VALUES,
  ACCOUNT_DEFAULT_VALUES,
} from '@/constants';
import { SignUpSchema } from '@/constants/rules';

// Context
import { WizardFormContextProvider } from '@/context';

// Actions
import { addAccount, addCard, signUp, updateUser } from '@/actions/auth';

// Interfaces
import { IAccountPayload, ICardPayload } from '@/interfaces';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { ContactForm } from '@/components/SignUpForm/ContactForm';
import { CreditCardForm } from '@/components/SignUpForm/CreditCardForm';
import { AccountForm } from '@/components/SignUpForm/AccountForm';
import { SuccessNotify } from '@/components/SignUpForm/SuccessNotify';
import { AuthContentWrapper, StepProgress } from '@/components';

type FormValues = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: SIGNUP_FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const submitHandler = async (data: FormValues) => {
    const { email, password, username } = data.user;

    const { phone, country, postal } = data.contact;

    const response = await signUp({
      email,
      password,
      username,
    });

    if (response.status === 400) {
      throw response.message;
    }

    if (response?.user) {
      const payloadAccount: IAccountPayload = {
        user: response?.user.id,
        data: ACCOUNT_DEFAULT_VALUES,
      };

      await updateUser(response.user.id, { phone, country, postal });

      const responseAccount = await addAccount(payloadAccount);

      if (responseAccount) {
        const payloadCard: ICardPayload = {
          account: responseAccount.data.id,
          data: data.card,
        };
        await addCard(payloadCard);
      }
    }
  };

  // Step content to register user
  const steps = [
    {
      name: 'user',
      formContent: <AccountForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'contact',
      formContent: <ContactForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'card',
      formContent: (
        <CreditCardForm schema={SignUpSchema} submitHandler={submitHandler} />
      ),
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'success',
      formContent: <SuccessNotify />,
      textHeading: 'Your Account Has Been Successfully Created',
    },
  ];

  return (
    <WizardForm.Root
      schema={SignUpSchema}
      form={form}
      className='relative bottom-0 mx-auto h-full max-w-lg'
    >
      {steps.map(({ name, formContent, textHeading, textFooter }) => (
        <WizardForm.Step name={name} key={name}>
          <AuthContentWrapper
            formContent={formContent}
            textHeading={textHeading}
            textFooter={textFooter}
          />
        </WizardForm.Step>
      ))}

      <WizardForm.Footer>
        <WizardFormContextProvider>
          {({ currentStepIndex, onPrevStep }) => (
            <StepProgress
              onPrevStep={onPrevStep}
              steps={4}
              activeStep={currentStepIndex}
            />
          )}
        </WizardFormContextProvider>
      </WizardForm.Footer>
    </WizardForm.Root>
  );
};
