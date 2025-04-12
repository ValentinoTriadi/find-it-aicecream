import { Mic, MicOff } from 'lucide-react';

interface MicControllerProps {
  listening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const MicController: React.FC<MicControllerProps> = ({
  listening,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-full bg-dark-blue hover:bg-blue-950 w-fit h-fit p-2 transition 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {listening ? (
      <MicOff className="w-20 h-20 text-white" />
    ) : (
      <Mic className="w-20 h-20 text-white" />
    )}
  </button>
);

export default MicController;
