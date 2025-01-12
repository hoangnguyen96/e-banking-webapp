'use client';

import { cn } from '@nextui-org/react';

interface StepProgressProps {
  steps: number;
  activeStep: number;
  onPrevStep: (e: React.FormEvent) => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  activeStep,
  onPrevStep,
}) => (
  <div className='absolute bottom-0 flex w-full items-center justify-between gap-2'>
    {Array.from({ length: steps }).map((_, index) => {
      const handleClick = (e: React.FormEvent) => {
        if (index < activeStep && activeStep !== steps - 1) {
          onPrevStep(e);
        }
      };

      return (
        <div
          key={index}
          className={cn(
            'h-2 w-1/4 rounded-full bg-secondary-300 transition-all',
            { 'opacity-10': index !== activeStep },
          )}
          onClick={handleClick}
        />
      );
    })}
  </div>
);
