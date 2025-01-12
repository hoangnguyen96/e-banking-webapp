'use client';

import { useEffect, useState } from 'react';
import { AuthError, Session } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { IAccount, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Services
import { getAccountsByUserId, getTotalTransactions } from '@/services';

// Components
import { CardOverview } from '../CardOverview';
import { Text } from '../common';
import { MyCalender } from '../MyCalender';
import { BalanceCardList } from './BalanceCardList';
import { MetricsCardList } from './MetricsCardList';
import { ServiceCardList } from './ServiceCardList';

interface IContainerAnalyticsProps {
  session: Session;
}

export const ContainerAnalytics = ({ session }: IContainerAnalyticsProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [totalTransfer, setTotalTransfer] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const total = await getTotalTransactions();
        const result = await getAccountsByUserId(session.user.id);

        setTotalTransfer(total);
        setAccounts(result || []);
      } catch (error) {
        if (error instanceof AuthError) {
          throw ERROR_MESSAGES.GET_ERROR;
        }
      }
    };

    fetchData();
  }, [session?.user?.accounts, session?.user?.id]);

  return (
    <section className='mx-auto flex h-full w-full gap-[34px] px-[22px] pt-1'>
      <div className='w-[75%]'>
        <Text as='h2' className='text-2xl font-semibold !text-black'>
          Good Evening,
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            size={TEXT_SIZE['2XL']}
            className='ml-1 font-medium'
          >
            {session?.user?.username || ''}
          </Text>
        </Text>
        <div className='mt-6 flex flex-col gap-6'>
          <BalanceCardList accounts={accounts} />
          <div className='flex gap-7'>
            <MetricsCardList totalTransfer={totalTransfer} />
            <CardOverview session={session} />
          </div>
          <div className='flex flex-col gap-8'>
            <Text as='span'>My Services</Text>
            <ServiceCardList />
          </div>
        </div>
      </div>
      <div className='w-[25%]'>
        <MyCalender />
      </div>
    </section>
  );
};
