// src/components/profile/AchievementTab.tsx
import { Trophy } from "lucide-react";

interface Achievement {
  title: string;
  icon: JSX.Element;
  description: string;
  completed?: boolean;
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
  // Tampilkan hanya achievement yang sudah selesai
  const completedAchievements = achievements.filter((ach) => ach.completed);

  return (
    <div className="bg-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-[#0a3b56] mb-4">
        Your Achievements
      </h3>
      <p className="text-gray-600 mb-4">
        You have unlocked {unlocked} out of {total} achievements.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {completedAchievements.slice(0, 4).map((ach, index) => (
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
      {completedAchievements.length > 4 && (
        <div className="mt-4 text-center">
          <a
            href="/achievements"
            className="text-sm font-medium text-[#0a3b56] hover:underline"
          >
            View More
          </a>
        </div>
      )}
      {completedAchievements.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          You haven't unlocked any achievements yet.
        </div>
      )}
    </div>
  );
}
