interface LevelProgressProps {
  exp: number;
}

export const calculateExp = (exp: number) => {
  const base = 2;
  const initialThreshold = 500;
  let lvl = 1;
  let nextLevelExp = initialThreshold;
  let maxExp = initialThreshold;

  while (exp >= initialThreshold * Math.pow(base, lvl - 1)) {
    lvl++;
    maxExp = initialThreshold * Math.pow(base, lvl);
    nextLevelExp = initialThreshold * Math.pow(base, lvl - 1) - exp;
    if (nextLevelExp < 0) {
      nextLevelExp = maxExp;
    }
  }

  let role = "Beginner";
  if (lvl < 3) {
    role = "Beginner";
  } else if (lvl < 5) {
    role = "Intermediate";
  } else if (lvl < 7) {
    role = "Advanced";
  } else if (lvl < 10) {
    role = "Expert";
  } else {
    role = "Master";
  }

  return {
    lvl,
    nextLevelExp,
    maxExp,
    role,
  };
};

export default function LevelProgress({ exp }: LevelProgressProps) {
  const { lvl, nextLevelExp, maxExp, role } = calculateExp(exp);
  return (
    <div className="rounded-xl bg-white shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-more-stronger-blue">
            Level {lvl}
          </h2>
          <p className="text-gray-500">{role}</p>
        </div>
        <div className="flex flex-col ">
          <span className="font-semibold text-more-stronger-blue">
            Next level at {maxExp - exp} exp
          </span>
          <div className="flex justify-end gap-1 text-sm text-gray-500 mb-2">
            <div>{exp} </div>/<div>{maxExp} exp</div>
          </div>
        </div>
      </div>
      <div className="relative pt-1">
        <div className="h-2 bg-gray-300 rounded overflow-hidden">
          <div
            className="bg-gradient-to-r shadow-sm from-dark-blue to-stronger-blue h-full rounded-r-full"
            style={{ width: `${(exp / maxExp) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
