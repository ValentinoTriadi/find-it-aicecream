import { useState } from "react";
import { Trophy, Swords, BookOpen, BarChart2, Award, MessageSquare } from "lucide-react";

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Sample achievement data
  // Dummy data with category
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

const achievements =
  activeTab === "All"
    ? allAchievements
    : allAchievements.filter((a) => a.category === activeTab);


  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a2a40] text-white flex flex-col">
        {/* User profile */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <img
              src="/placeholder.svg"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <h2 className="text-xl font-semibold">Maul Firdaus</h2>
          <p className="text-gray-400">Beginner</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-6">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-lg font-medium hover:text-[#5bb4e5] transition-colors"
              >
                <Swords className="w-6 h-6" />
                Battle
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-lg font-medium hover:text-[#5bb4e5] transition-colors"
              >
                <BookOpen className="w-6 h-6" />
                Learn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-lg font-medium hover:text-[#5bb4e5] transition-colors"
              >
                <BarChart2 className="w-6 h-6" />
                Leaderboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 text-lg font-medium text-[#5bb4e5]">
                <Award className="w-6 h-6" />
                Achievement
              </a>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div className="p-6 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0a3b56] rounded-full flex items-center justify-center border border-[#5bb4e5]">
              <MessageSquare className="w-5 h-5 text-[#5bb4e5]" />
            </div>
            <span className="text-xl font-bold">BattleTalk</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#0a3b56]">Achievements</h1>
            <div className="flex items-center gap-2 text-[#0a3b56]">
              <Trophy className="w-5 h-5 text-[#5bb4e5]" />
              <span className="text-lg">12/30 Completed</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="inline-flex bg-[#e8f4f9] rounded-md p-1">
              {["All", "Battle", "Personal"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md ${
                    activeTab === tab ? "bg-white text-[#0a3b56] font-medium" : "text-[#0a3b56] hover:bg-white/50"
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
                className={`rounded-lg p-6 border ${
                  achievement.completed ? "bg-[#e8f4f9] border-[#5bb4e5]" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.completed ? "bg-[#5bb4e5]" : "bg-gray-300"
                    }`}
                  >
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0a3b56]">{achievement.title}</h3>
                    <p className="text-gray-600 mb-4">{achievement.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{achievement.progress}% Completed</span>
                      {achievement.completed && <span className="text-[#5bb4e5] font-medium">Completed</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}