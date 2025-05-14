import {
  Award,
  BarChart2,
  BookOpen,
  MessageSquare,
  Swords,
  Trophy,
} from "lucide-react";
import { useState } from "react";

interface AchievementInterface {
  id: number;
  title: string;
  description: string;
  category: AchievementCategory;
  completed: boolean;
  progress: number;
}

const allAchievements = [
  {
    id: 1,
    title: "First Victory",
    description: "Win your first battle",
    category: "Battle",
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Unstoppable",
    description: "Win 5 battles in a row",
    category: "Battle",
    completed: true,
    progress: 60,
  },
  {
    id: 3,
    title: "Master Debater",
    description: "Win 10 battles",
    category: "Battle",
    completed: true,
    progress: 30,
  },
  {
    id: 4,
    title: "Learner",
    description: "Complete your first lesson",
    category: "Personal",
    completed: true,
    progress: 100,
  },
  {
    id: 5,
    title: "Knowledge Seeker",
    description: "Complete 5 lessons",
    category: "Personal",
    completed: false,
    progress: 20,
  },
  {
    id: 6,
    title: "Fluent Speaker",
    description: "Speak for 10 minutes total",
    category: "Personal",
    completed: false,
    progress: 80,
  },
  {
    id: 7,
    title: "Fast Thinker",
    description: "Respond within 2s in a battle",
    category: "Battle",
    completed: true,
    progress: 100,
  },
  {
    id: 8,
    title: "Consistent",
    description: "Log in 7 days in a row",
    category: "Personal",
    completed: false,
    progress: 40,
  },
  {
    id: 9,
    title: "Community Voice",
    description: "Give feedback to another user",
    category: "Personal",
    completed: false,
    progress: 0,
  },
];

type AchievementCategory = "All" | "Battle" | "Personal";

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<AchievementCategory>("All");

  const achievements =
    activeTab === "All"
      ? allAchievements
      : allAchievements.filter((a) => a.category === activeTab);

  return (
    <div className="flex-1 px-10 p-8 overflow-auto">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-more-stronger-blue">
            Achievements
          </h1>
          <div className="flex items-center gap-2 text-more-stronger-blue">
            <Trophy className="w-5 h-5" />
            <span className="text-lg font-semibold">12/30 Completed</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="grid gap-1 grid-cols-3 bg-white rounded-md p-1">
            {["All", "Battle", "Personal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as AchievementCategory)}
                className={`px-6 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-more-stronger-blue/20 text-dark-blue font-medium"
                    : "text-dark-blue hover:bg-black/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg p-6 shadow-md border ${
                achievement.completed
                  ? " border-yellow-400"
                  : " border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.completed ? "bg-yellow-400" : "bg-gray-300"
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
