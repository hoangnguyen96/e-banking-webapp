'use client';

import { Controller, useForm } from 'react-hook-form';
import { useDisclosure } from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas
import { ProfileSchema } from '@/schemas';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Input, EyeIcon, EyeSlashIcon, Text } from '@/components';

type FormValues = z.infer<typeof ProfileSchema>;

export const ProfileForm = () => {
  const { control } = useForm<FormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      user: {
        username: 'Pheroxios Yehudi',
        email: 'pheroxios@yehudi.com',
        fullName: 'Pheroxios Yehudi',
        password: '1234@Abc',
      },
    },
    mode: 'all',
  });

  const {
    isOpen: passwordIsOpen,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();

  return (
    <form className='flex flex-col gap-4 pl-8 pr-[87px]'>
      <div className='mb-14 flex flex-col gap-8'>
        <div className='flex gap-[107px]'>
          <Controller
            control={control}
            name='user.username'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Username'
                placeholder=' '
                labelPlacement='outside'
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                value={String(value)}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name='user.fullName'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Full Name'
                labelPlacement='outside'
                placeholder=' '
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm font-normal',
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>

        <div className='flex gap-[107px]'>
          <Controller
            control={control}
            name='user.email'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Email Address'
                labelPlacement='outside'
                placeholder=' '
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name='user.password'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Password'
                labelPlacement='outside'
                aria-label='password'
                placeholder='Password'
                type={passwordIsOpen ? 'text' : 'password'}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                readOnly
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
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className='mb-5 flex flex-col gap-2.5'>
        <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE.SM}>
          Socials
        </Text>

        <Text
          variant={TEXT_VARIANT.INFO}
          size={TEXT_SIZE.XS}
          className='font-normal'
        >
          Note: This username or email will be public
        </Text>
      </div>

      <div className='flex gap-[108px]'>
        <Controller
          control={control}
          name='user.email'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label='Paypal'
              labelPlacement='outside'
              placeholder=' '
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                input: 'm-0 text-sm font-normal',
              }}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name='user.email'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label='Google Pay'
              labelPlacement='outside'
              placeholder=' '
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                input: 'm-0 text-sm font-normal',
              }}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>
    </form>
  );
};