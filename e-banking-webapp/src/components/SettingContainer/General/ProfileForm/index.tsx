'use client';

// Interfaces
import { IUser, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Actions
import { updateUser } from '@/actions';

// Components
import { Input, Text } from '@/components';
import { UploadImage } from '@/components/SettingContainer/General/UploadImage';

interface ProfileFormProps {
  userProfile: IUser;
}

export const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const { username, email, phone, country, avatar } = userProfile;

  const handleChangeImage = async (url: string) => {
    await updateUser(userProfile.id, { avatar: url });
  };

  const handleRemoveImage = async () => {
    await updateUser(userProfile.id, { avatar: '' });
  };

  return (
    <div className='flex flex-col pr-[87px]'>
      <div className='mb-10'>
        <Text
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE.SM}
          className='mb-[11px]'
        >
          Profile Picture
        </Text>

        <div className='flex flex-col'>
          <UploadImage
            src={avatar}
            alt='Avatar'
            onChange={handleChangeImage}
            onRemove={handleRemoveImage}
          />
        </div>
      </div>

      <div className='mb-14 flex max-w-[1024px] flex-col gap-8'>
        <div className='flex gap-[107px]'>
          <Input
            label='Username'
            placeholder=' '
            labelPlacement='outside'
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-sm',
            }}
            value={username}
            readOnly
          />

          <Input
            label='Phone Number'
            labelPlacement='outside'
            placeholder=' '
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-sm font-normal',
            }}
            value={phone}
            readOnly
          />
        </div>

        <div className='flex gap-[107px]'>
          <Input
            label='Email'
            labelPlacement='outside'
            placeholder=' '
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-sm',
            }}
            value={email}
            readOnly
          />

          <Input
            label='Address'
            labelPlacement='outside'
            aria-label='address'
            placeholder='Address'
            value={country}
            type='text'
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-sm',
            }}
            readOnly
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

      <div className='flex max-w-[1024px] gap-[108px]'>
        <Input
          label='Paypal'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm font-normal',
          }}
          value={email}
          readOnly
        />

        <Input
          label='Google Pay'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm font-normal',
          }}
          value={email}
          readOnly
        />
      </div>
    </div>
  );
};
