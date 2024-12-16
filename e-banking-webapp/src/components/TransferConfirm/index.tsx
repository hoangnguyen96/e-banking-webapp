import { Button } from '../common';

interface ITransferConfirm {
  title: string;
  amount: number;
  description: string;
  onCancel: () => void;
  onProceed: () => void;
}

export const TransferConfirm = ({
  title,
  amount,
  description,
  onCancel,
  onProceed,
}: ITransferConfirm) => (
  <div className='flex w-[252px] flex-col items-center text-center'>
    <span className='text-sm font-semibold text-navyBlue'>{title}</span>
    <span className='mt-3 text-4xl font-bold text-navyBlue'>${amount}</span>
    <span className='mt-3 text-xs font-medium text-transparentBlack'>
      {description}
    </span>
    <div className='mt-10 flex gap-6'>
      <Button radius='xs' color='danger' size='xxl' onClick={onCancel}>
        Cancel
      </Button>
      <Button radius='xs' color='navyBlue' size='xxl' onClick={onProceed}>
        Procced
      </Button>
    </div>
  </div>
);
