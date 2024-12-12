'use client';

// Libs
import {
  Avatar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Navbar as NavbarNextUI,
} from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';

// Constants
import { IMAGES, NavbarItem } from '@/constants';
import { MOCK_CUSTOM_OPTIONS } from '@/mocks';

// Components
import {
  MenuDropdown,
  Navbar,
  NotificationIcon,
  SearchIcon,
} from '@/components';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileMenuOptions = [
    ...NavbarItem.map((item) => ({
      key: item.path,
      label: item.text,
    })),
  ];

  return (
    <NavbarNextUI
      classNames={{
        wrapper: 'max-w-full justify-start',
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className='flex items-center gap-[88px]'>
        <NavbarBrand className='gap-5'>
          <MenuDropdown
            options={mobileMenuOptions}
            customTriggerElement={
              <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className='hidden max-[700px]:flex'
              />
            }
            isDivided={true}
          />
          <Image
            src={IMAGES.LOGO}
            alt='Logo EBanking'
            width={104}
            height={36}
          />
        </NavbarBrand>
        <NavbarContent
          className='flex gap-[59px] font-normal text-transparentBlack max-[700px]:hidden'
          data-justify='center'
        >
          <Navbar navbarItem={NavbarItem} />
        </NavbarContent>
      </div>
      <NavbarContent data-justify='end'>
        <SearchIcon />
        <NotificationIcon />
        <MenuDropdown
          customTriggerElement={<Avatar className='h-6 w-6 rounded-full' />}
          options={MOCK_CUSTOM_OPTIONS}
          isDivided={true}
        />
      </NavbarContent>
    </NavbarNextUI>
  );
};
