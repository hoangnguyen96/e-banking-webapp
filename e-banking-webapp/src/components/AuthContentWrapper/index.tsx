'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Constants
import { IMAGES, ROUTES } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '../common';

interface AuthContentWrapperProps {
  textFooter: string;
  textHeading: ReactNode;
  formContent: ReactNode;
}

export const AuthContentWrapper = ({
  textHeading,
  formContent,
  textFooter,
}: AuthContentWrapperProps) => {
  const pathname = usePathname();

  const isOnSignIn = pathname === ROUTES.SIGN_IN;

  const linkDetails = {
    text: isOnSignIn ? 'Register' : 'Login',
    href: isOnSignIn ? ROUTES.SIGN_UP : ROUTES.SIGN_IN,
  };

  const classLogo = isOnSignIn ? 'mt-0 md:mt-[108px]' : '';

  return (
    <div className='flex flex-1 flex-col'>
      {/* Logo */}
      <Image
        className={`pb-9 ${classLogo}`}
        src={IMAGES.LOGO}
        width={104}
        height={36}
        alt='Logo EBanking'
      />

      <div className='mb-7'>
        <Text as='h1' size={TEXT_SIZE['4XL']} variant={TEXT_VARIANT.DEFAULT}>
          {textHeading}
        </Text>
      </div>

      {/* Form */}
      <div className='mb-[17px]'>{formContent}</div>

      <Text size={TEXT_SIZE.SM} variant={TEXT_VARIANT.DEFAULT}>
        {textFooter}&nbsp;
        <Link href={linkDetails.href} className='text-primary-200'>
          {linkDetails.text}
        </Link>
      </Text>
    </div>
  );
};
