interface EnemyTimerBarProps {
    progress: number; // from 0 to 1
  }
  
  const EnemyTimerBar: React.FC<EnemyTimerBarProps> = ({ progress }) => {
    return (
      <div className="w-[400px] h-6 bg-[#555] rounded-full shadow-[0_0_30px_5px_rgba(0,0,0,0.5)] overflow-hidden">
        <div
          className="h-full bg-[#aaa] transition-all duration-100"
          style={{
            width: `${progress * 100}%`,
            borderTopRightRadius: progress === 1 ? '9999px' : '0',
            borderBottomRightRadius: progress === 1 ? '9999px' : '0',
          }}
        />
      </div>
    );
  };
  
  export default EnemyTimerBar;
  