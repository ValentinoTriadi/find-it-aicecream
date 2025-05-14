interface Achievement {
  title: string;
  icon: JSX.Element;
  description: string;
}

interface AchievementTabProps {
  unlocked: number;
  total: number;
  achievements: Achievement[];
}

export default function AchievementTab({
  unlocked,
  total,
  achievements,
}: AchievementTabProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-more-stronger-blue mb-4">
        Your Achievements
      </h3>
      <p className="text-gray-600 mb-4">
        You have unlocked {unlocked} out of {total} achievements.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.slice(0, 4).map((ach, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex items-start gap-3"
          >
            <div className="mt-1">{ach.icon}</div>
            <div>
              <h4 className="font-semibold text-[#0a3b56]">{ach.title}</h4>
              <p className="text-sm text-gray-600">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
      {achievements.length > 4 && (
        <div className="mt-4 text-center">
          <a
            href="/achievement"
            className="text-sm font-medium text-[#0a3b56] hover:underline"
          >
            View More
          </a>
        </div>
      )}
    </div>
  );
}
