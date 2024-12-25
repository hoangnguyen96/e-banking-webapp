// Types
import { CustomClassType } from '@/interfaces';

export const ImageIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    width='56'
    height='56'
    viewBox='0 0 56 56'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={customClass}
  >
    <path
      opacity='0.4'
      d='M38.1099 51.3333H17.8877C9.97941 51.3333 4.66666 45.7867 4.66666 37.53V18.4723C4.66666 10.2156 9.97941 4.66666 17.8877 4.66666H38.1122C46.0206 4.66666 51.3333 10.2156 51.3333 18.4723V37.53C51.3333 45.7867 46.0206 51.3333 38.1099 51.3333Z'
      fill='#5570F1'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M26.2383 20.2416C26.2383 23.4383 23.6367 26.04 20.44 26.04C17.241 26.04 14.6417 23.4383 14.6417 20.2416C14.6417 17.045 17.241 14.441 20.44 14.441C23.6367 14.441 26.2383 17.045 26.2383 20.2416ZM45.2676 32.871C45.8113 33.3984 46.2009 34.0004 46.4576 34.642C47.2346 36.5834 46.8309 38.9167 46.0003 40.8394C45.0156 43.1284 43.1303 44.8574 40.7549 45.6134C39.7003 45.9517 38.5943 46.0964 37.4906 46.0964H17.9349C15.9889 46.0964 14.2669 45.6437 12.8553 44.7944C11.9709 44.2624 11.8146 43.0374 12.4703 42.2394C13.5669 40.9094 14.6496 39.5747 15.7416 38.2284C17.8229 35.6524 19.2253 34.9057 20.7839 35.5614C21.4163 35.832 22.0509 36.2404 22.7043 36.6697C24.4449 37.8224 26.8646 39.4044 30.0519 37.687C32.2306 36.4957 33.4953 34.4572 34.5961 32.6828L34.6183 32.647C34.6923 32.5283 34.7658 32.4096 34.839 32.2913C35.2133 31.6865 35.582 31.0908 35.9996 30.5424C36.5176 29.8634 38.4403 27.74 40.9253 29.252C42.5096 30.204 43.8419 31.492 45.2676 32.871Z'
      fill='#5570F1'
    />
  </svg>
);
