interface TimerCircleProps {
  progress: number; // 0 to 1
}

const TimerCircle: React.FC<TimerCircleProps> = ({ progress }) => {
  const angle = progress * 360;

  return (
    <div className="relative w-48 h-48">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#1A4A6C ${angle}deg, #EDFCF8 ${angle}deg)`,
        }}
      />
      <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center shadow-[0_0_60px_0_rgba(26,74,108,0.5)]">
        <span className="text-xl font-bold text-dark-blue">Your Turn!</span>
      </div>
    </div>
  );
};

export default TimerCircle;
