'use client';

import { Avatar } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

// Context
import { useToastContext } from '@/context';

// Hooks
import { useUploadImage } from '@/hooks';

// Components
import { Button, CameraIcon, ImageIcon, TrashIcon } from '@/components';

export interface IUploadImageProps {
  height?: string;
  width?: string;
  alt: string;
  src?: string;
  name: string;
  onChange: (url: string) => void;
  onRemove?: (name: string) => void;
}

export const UploadImage = ({
  alt,
  src,
  name,
  onChange,
  onRemove,
}: IUploadImageProps) => {
  const [previewImage, setPreviewImage] = useState(src);

  const { showToast } = useToastContext();

  const { uploading, handleUploadImage } = useUploadImage();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    onRemove?.(name);
    setPreviewImage('');
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const isJpgOrPng =
      file?.type === 'image/jpeg' || file?.type === 'image/png';

    if (!isJpgOrPng) {
      showToast('You can only upload JPG/PNG file!', 'error', 'top-center');
    }
    const isLt2M = file!.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      showToast('Image upload must smaller than 1MB!', 'error', 'top-center');
    }

    if (file && isJpgOrPng && isLt2M) {
      const { url } = await handleUploadImage(file);

      return url;
    }
    return null;
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleChange(e);

    if (url) {
      onChange(url);
      setPreviewImage(url);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex items-center'>
      {!previewImage || uploading ? (
        <button
          type='button'
          onClick={handleButtonClick}
          className='mr-[27px] flex h-[112px] w-[112px] items-center justify-center rounded-full border-2 border-dashed border-primary-200 hover:border-primary-100 focus:outline-none'
        >
          {uploading ? <ImageIcon /> : <CameraIcon />}
        </button>
      ) : (
        <Avatar alt={alt} className='mr-[27px] h-[112px] w-[112px]' src={src} />
      )}

      <label>
        <input
          name='upload'
          type='file'
          hidden
          style={{ display: 'none' }}
          accept='image/png, image/webp, image/jpeg'
          onChange={handleUploadFile}
          ref={inputRef}
        />
        <Button
          className='mr-[33px] border-primary-200 border-opacity-50'
          variant='outline'
          color='info'
          radius='xs'
          size='sm'
          onClick={handleButtonClick}
        >
          Upload
        </Button>
      </label>

      <button className='text-primary-200' onClick={handleRemoveImage}>
        <TrashIcon />
      </button>
    </div>
  );
};
