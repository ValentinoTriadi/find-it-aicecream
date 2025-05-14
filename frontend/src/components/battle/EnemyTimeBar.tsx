interface EnemyTimerBarProps {
  progress: number; // from 0 to 1
}

const EnemyTimerBar: React.FC<EnemyTimerBarProps> = ({ progress }) => {
  return (
    <div className="w-[400px] h-6 bg-gray-300 rounded-full shadow-md overflow-hidden">
      <div
        className="h-full  bg-gradient-to-r to-dark-blue/70 from-stronger-blue rounded-r-full shadow-md transition-all duration-100"
        style={{
          width: `${progress * 100}%`,
          borderTopRightRadius: progress === 1 ? "9999px" : "0",
          borderBottomRightRadius: progress === 1 ? "9999px" : "0",
        }}
      />
    </div>
  );
};

export default EnemyTimerBar;
