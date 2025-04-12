interface LevelProgressProps {
    level: number;
    role: string;
    exp: number;
    maxExp: number;
    nextLevelExp: number;
  }
  
  export default function LevelProgress({
    level,
    role,
    exp,
    maxExp,
    nextLevelExp,
  }: LevelProgressProps) {
    return (
      <div className="rounded-xl bg-card p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-dark-blue">Level {level}</h2>
            <p className="text-gray-500">{role}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Next Level</p>
            <p className="font-medium text-dark-blue">{nextLevelExp} Exp Needed</p>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <div>{exp} exp</div>
            <div>{maxExp} exp</div>
          </div>
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div className="bg-dark-blue h-full" style={{ width: `${(exp / maxExp) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
  