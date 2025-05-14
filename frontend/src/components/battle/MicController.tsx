import { Button } from "../ui/button";
import { Mic, MicOff } from "lucide-react";

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
  // <button
  //   onClick={onClick}
  //   disabled={disabled}
  //   className={`rounded-full bg-dark-blue hover:bg-blue-950 w-fit h-fit p-2 transition
  //     ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  //     >
  //   {listening ? (
  //     <MicOff className="w-20 h-20 text-white" />
  //   ) : (
  //     <Mic className="w-20 h-20 text-white" />
  //   )}
  // </button>

  <Button
    variant="outline"
    size="icon"
    className={`mt-6 h-14 w-14 rounded-full ${
      listening
        ? "bg-red-100 border-red-400 text-red-600"
        : "bg-white border-slate-200"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {listening ? (
      <MicOff className={`h-6 w-6 text-red-600`} />
    ) : (
      <Mic className={`h-6 w-6 text-slate-700`} />
    )}
  </Button>
);

export default MicController;
