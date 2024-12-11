'use client';

import { useDisclosure } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

// Constants
import { signInSchema } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT, TSignInFormData } from '@/interfaces';

// Components
import { EyeIcon, EyeSlashIcon, LockIcon, UserIcon } from '@/components/icons';
import { Button, Input, Text } from '@/components';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<TSignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const {
    isOpen: passwordIsOpen,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();

  // TODO: handle form submission
  const onSubmit = handleSubmit(async (data) => {
    console.log('data', data);
  });

  return (
    <form onSubmit={onSubmit} className='mr-0 md:mr-[83px]'>
      <div className='mb-8 flex w-full flex-col gap-6 bg-white md:gap-4'>
        <Text
          size={TEXT_SIZE.SM}
          variant={TEXT_VARIANT.INFO}
          className='font-normal'
        >
          Sign in to your account to continue
        </Text>

        {/* Sign-in with username */}
        <Controller
          control={control}
          name='username'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='username'
              placeholder='Username'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<UserIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='password'
              placeholder='Password'
              className='dark:text-foreground-200'
              startContent={<LockIcon />}
              type={passwordIsOpen ? 'text' : 'password'}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={passwordIsOpen ? closePassword : openPassword}
                >
                  {passwordIsOpen ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <Link href='#' aria-disabled className='text-right text-sm'>
          Forgot Password?
        </Link>
      </div>

      <Button isDisabled={!isDirty} type='submit' color='primary'>
        Sign In
      </Button>
    </form>
  );
};