import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth.context";
import {
  fetchAllAchievements,
  fetchUserAchievements,
} from "@/api/achievement";

type AchievementCategory = "All" | "Battle" | "Personal";

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: "Battle" | "Personal";
}

interface UserAchievement {
  achievement_id: number;
  progress: number;
  completed: boolean;
}

interface AchievementWithProgress extends Achievement {
  progress: number;
  completed: boolean;
}

export default function AchievementsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AchievementCategory>("All");
  const [allAchievements, setAllAchievements] = useState<AchievementWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    Promise.all([
      fetchAllAchievements(),
      fetchUserAchievements(user.id),
    ])
      .then(([achievements, userAchievements]) => {
        // Gabungkan data
        const merged: AchievementWithProgress[] = achievements.map((a: Achievement) => {
          const userA = userAchievements.find(
            (ua: UserAchievement) => ua.achievement_id === a.id
          );
          return {
            ...a,
            progress: userA ? userA.progress : 0,
            completed: userA ? userA.completed : false,
          };
        });
        setAllAchievements(merged);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const filteredAchievements =
    activeTab === "All"
      ? allAchievements
      : allAchievements.filter((a) => a.category === activeTab);

  const completedCount = allAchievements.filter((a) => a.completed).length;

  if (loading) {
    return <div className="p-8 text-center">Loading achievements...</div>;
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-dark-blue">Achievements</h1>
          <div className="flex items-center gap-2 text-dark-blue">
            <Trophy className="w-5 h-5 text-stronger-blue" />
            <span className="text-lg">
              {completedCount}/{allAchievements.length} Completed
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="inline-flex bg-card rounded-md p-1">
            {["All", "Battle", "Personal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as AchievementCategory)}
                className={`px-6 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-white text-dark-blue font-medium"
                    : "text-dark-blue hover:bg-white/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg p-6 border ${
                achievement.completed
                  ? "bg-card border-stronger-blue"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.completed ? "bg-stronger-blue" : "bg-gray-300"
                  }`}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-dark-blue">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {achievement.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {achievement.progress}% Completed
                    </span>
                    {achievement.completed && (
                      <span className="text-stronger-blue font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
