import { Home, Play, Repeat, X } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

interface PausePopupProps {
  topicName: string;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export default function PausePopup({
  topicName,
  onResume,
  onRestart,
  onExit,
}: PausePopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50    bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white rounded-lg p-8 shadow-md text-center min-w-[320px] relative gap-2">
        <CardHeader className="flex m-0 p-0 flex-col gap-2 items-center justify-center">
          <Button
            variant={'ghost'}
            className="absolute top-2 right-2"
            onClick={onExit}
          >
            <X />
          </Button>
          <h2 className="text-lg font-bold text-dark-blue">Battle Paused</h2>
          <p className="text-sm text-primary-border-fg mb-4">
            Topic: {topicName}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-5 gap-5">
          <button
            type="button"
            onClick={onResume}
            className="bg-stronger-blue text-white py-2 flex items-center justify-center w-16 h-16 rounded-full mb-4"
          >
            <Play />
          </button>
          <div className="flex justify-between gap-4 w-full">
            <Button
              onClick={onRestart}
              className="flex flex-col gap-1 justify-center  border border-stronger-blue text-stronger-blue px-4 py-6 min-w-32 rounded"
              variant={'outline'}
            >
              <Repeat /> Restart
            </Button>
            <Button
              onClick={onExit}
              className="flex flex-col gap-1 justify-center  border border-stronger-blue text-stronger-blue px-4 py-6 min-w-32 rounded"
              variant={'outline'}
            >
              <Home /> Exit Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
