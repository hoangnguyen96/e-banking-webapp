'use client';

import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '@nextui-org/react';

// Interfaces
import { Preferences, TEXT_VARIANT } from '@/interfaces';

// Constants
import { PREFERENCES } from '@/constants';

// Components
import { Button, Text } from '@/components/common';

export const EmailTab = () => {
  const { control, handleSubmit, reset } = useForm<Preferences>({
    defaultValues: {
      announcements: true,
      updates: true,
      feedbacksSurvey: true,
      events: true,
      generalNotification: true,
      promotions: true,
      eventsNearMe: true,
    },
  });

  const onSubmit = (data: Preferences) => {
    console.log('Updated Preferences:', data);
    // Add API call logic here
  };

  const handleUnsubscribeAll = () => {
    reset({
      announcements: false,
      updates: false,
      feedbacksSurvey: false,
      events: false,
      generalNotification: false,
      promotions: false,
      eventsNearMe: false,
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2.5 pb-[22px]'>
        <Text as='span' className='text-sm font-semibold text-navyBlue'>
          Email/ Notification Settings
        </Text>

        <Text
          variant={TEXT_VARIANT.DEFAULT}
          as='span'
          className='mt-[5px] text-[13px] font-normal'
        >
          Your connected App, socials and Accounts will appear here.
        </Text>
      </div>

      <ul className='flex flex-col gap-4 pb-[58px]'>
        {PREFERENCES.map(({ label, key }) => (
          <Controller
            key={key}
            name={key as keyof Preferences}
            control={control}
            render={({ field }) => (
              <Checkbox
                id={key}
                isSelected={field.value}
                onChange={(isChecked) => field.onChange(isChecked)}
                classNames={{
                  label: 'text-xs text-foreground-100',
                  wrapper: 'after:bg-primary-200',
                }}
              >
                {label}
              </Checkbox>
            )}
          />
        ))}
      </ul>

      <div className='flex w-full max-w-[680px] flex-col items-start gap-4'>
        <Button color='navyBlue' radius='xs' type='submit'>
          Update Email Preferences
        </Button>

        <button
          onClick={handleUnsubscribeAll}
          className='text-xs text-foreground-300 underline hover:text-primary-200'
        >
          Unsubscribe from all
        </button>
      </div>
    </form>
  );
};
