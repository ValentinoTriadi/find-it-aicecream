// src/pages/lesson/footer.tsx
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useKey, useMedia } from 'react-use';

import { cn } from '../../../lib/utils';

type FooterProps = {
  onCheck: () => void;
  status: 'correct' | 'wrong' | 'none' | 'completed';
  disabled?: boolean;
  isVideoLesson?: boolean;
};

export const LessonFooter = ({
  onCheck,
  status,
  disabled,
  isVideoLesson = false,
}: FooterProps) => {
  useKey('Enter', onCheck, {}, [onCheck]);
  const isMobile = useMedia('(max-width: 1024px)');

  return (
    <footer
      className={cn(
        'h-[100px] border-t-2 lg:h-[140px]',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100',
      )}
    >
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10">
        {status === 'correct' && (
          <div className="flex items-center text-base font-bold text-green-500 lg:text-2xl">
            <CheckCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Nicely done!
          </div>
        )}

        {status === 'wrong' && (
          <div className="flex items-center text-base font-bold text-rose-500 lg:text-2xl">
            <XCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Try again.
          </div>
        )}

        <Button
          disabled={disabled}
          aria-disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'wrong' ? 'destructive' : 'secondary'}
        >
          {status === 'none' && (isVideoLesson ? 'Complete' : 'Check')}
          {status === 'correct' && 'Next'}
          {status === 'wrong' && 'Retry'}
          {status === 'completed' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
};
