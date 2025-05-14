import { fetchAllAchievements, fetchUserAchievements } from '@/api/achievement';
import SimpleLoading from '@/components/loading';
import { useAuth } from '@/context/auth.context';
import {
  Award,
  BarChart2,
  BookOpen,
  MessageSquare,
  Swords,
  Trophy,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Achievement {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  category: string;
  completed?: boolean;
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
  const [activeTab, setActiveTab] = useState<string>('All');
  const [allAchievements, setAllAchievements] = useState<
    AchievementWithProgress[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    Promise.all([fetchAllAchievements(), fetchUserAchievements(user.id)])
      .then(([achievements, userAchievements]) => {
        // Gabungkan data
        const merged: AchievementWithProgress[] = achievements.map(
          (a: Achievement) => {
            const userA = userAchievements.find(
              (ua: UserAchievement) => ua.achievement_id === a.id,
            );
            return {
              ...a,
              progress: userA ? userA.progress : 0,
              completed: userA ? userA.completed : false,
            };
          },
        );
        setAllAchievements(merged);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const filteredAchievements =
    activeTab === 'All'
      ? allAchievements
      : allAchievements.filter((a) => a.category === activeTab);

  const completedCount = allAchievements.filter((a) => a.completed).length;

  if (loading) {
    return <SimpleLoading />;
  }

  return (
    <div className="flex-1 px-10 p-8 overflow-auto">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-more-stronger-blue">
            Achievements
          </h1>
          <div className="flex items-center gap-2 text-more-stronger-blue">
            <Trophy className="w-5 h-5 text-stronger-blue" />
            <span className="text-lg">
              {completedCount}/{allAchievements.length} Completed
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="grid gap-1 grid-cols-3 bg-white rounded-md p-1">
            {['All', 'Battle', 'Personal'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md ${
                  activeTab === tab
                    ? 'bg-more-stronger-blue/20 text-dark-blue font-medium'
                    : 'text-dark-blue hover:bg-black/20'
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
              className={`rounded-lg p-6 shadow-md border ${
                achievement.completed
                  ? ' border-yellow-400'
                  : ' border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-yellow-400' : 'bg-gray-300'
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
                      <span className="text-yellow-400 font-medium">
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
