import { useState } from "react";
import { Swords, BookOpen, BarChart2, Award, MessageSquare, Star, Edit, Trophy } from "lucide-react";

const userData = {
  name: "John Doe",
  joinDate: "March 2025",
  level: 5,
  role: "Beginner",
  exp: 1250,
  maxExp: 2000,
  nextLevelExp: 750,
  achievementsUnlocked: 12,
  totalAchievements: 30,
  battleStats: {
    battlesWon: 7,
    battleStars: 18,
    averageScore: 88,
  },
  skills: {
    Speaking: 3,
    Vocabulary: 3,
    Grammar: 3,
    Listening: 3,
  },
};

const achievements = [
  { title: "First Battle Won", icon: <Trophy className="w-5 h-5 text-[#5bb4e5]" />, description: "Win your first battle." },
  { title: "Grammar Guru", icon: <BookOpen className="w-5 h-5 text-[#5bb4e5]" />, description: "Master grammar skills." },
  { title: "Vocabulary Vault", icon: <Award className="w-5 h-5 text-[#5bb4e5]" />, description: "Reach vocab level 3." },
  { title: "Listening Legend", icon: <BarChart2 className="w-5 h-5 text-[#5bb4e5]" />, description: "Level up listening skill." },
  { title: "Speak Up!", icon: <MessageSquare className="w-5 h-5 text-[#5bb4e5]" />, description: "Finish 5 speaking battles." },
  { title: "Consistent Learner", icon: <Star className="w-5 h-5 text-[#5bb4e5]" />, description: "Log in 7 days in a row." },
];


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Stats");

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < count ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-300"}`}
      />
    ));
  };

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
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-400">{userData.role}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-6">
            {[
              { icon: <Swords className="w-6 h-6" />, label: "Battle" },
              { icon: <BookOpen className="w-6 h-6" />, label: "Learn" },
              { icon: <BarChart2 className="w-6 h-6" />, label: "Leaderboard" },
              { icon: <Award className="w-6 h-6" />, label: "Achievement" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 text-lg font-medium hover:text-[#5bb4e5] transition-colors"
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="rounded-xl overflow-hidden bg-[#e8f4f9]">
            <div className="h-24 bg-gradient-to-r from-[#2d4b6e] to-[#5bb4e5] relative">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white"></div>
              </div>
            </div>

            <div className="pt-16 pb-6 px-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-[#0a3b56]">{userData.name}</h1>
                  <p className="text-gray-500">Joined {userData.joinDate}</p>
                  <div className="flex gap-6 mt-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#5bb4e5]" />
                      <span>{userData.achievementsUnlocked} achievements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#5bb4e5]" />
                      <span>{userData.exp} exp</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Level section */}
          <div className="rounded-xl bg-[#e8f4f9] p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0a3b56]">Level {userData.level}</h2>
                <p className="text-gray-500">{userData.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Next Level</p>
                <p className="font-medium text-[#0a3b56]">{userData.nextLevelExp} Exp Needed</p>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <div>{userData.exp} exp</div>
                <div>{userData.maxExp} exp</div>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="bg-[#2d4b6e] h-full"
                  style={{ width: `${(userData.exp / userData.maxExp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-2">
            <div className="inline-flex bg-[#e8f4f9] rounded-md p-1">
              {["Stats", "Achievement"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md ${
                    activeTab === tab
                      ? "bg-white text-[#0a3b56] font-medium"
                      : "text-[#0a3b56] hover:bg-white/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Stats" && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance */}
              <div className="bg-[#e8f4f9] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart2 className="w-5 h-5 text-[#0a3b56]" />
                  <h3 className="text-lg font-semibold text-[#0a3b56]">Performance</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(userData.skills).map(([skill, stars]) => (
                    <div className="flex justify-between items-center" key={skill}>
                      <span className="text-gray-600">{skill}</span>
                      <div className="flex">{renderStars(stars)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Battle Stats */}
              <div className="bg-[#e8f4f9] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Swords className="w-5 h-5 text-[#0a3b56]" />
                  <h3 className="text-lg font-semibold text-[#0a3b56]">Battle Stats</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Battles Won</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-[#0a3b56]">{userData.battleStats.battlesWon}</span>
                      <Trophy className="w-4 h-4 text-[#5bb4e5]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Battle Star</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-[#0a3b56]">{userData.battleStats.battleStars}</span>
                      <Star className="w-4 h-4 text-[#ffc107]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium text-[#0a3b56]">{userData.battleStats.averageScore} %</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Achievement" && (
              <div className="bg-[#e8f4f9] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a3b56] mb-4">Your Achievements</h3>
                <p className="text-gray-600 mb-4">
                  You have unlocked {userData.achievementsUnlocked} out of {userData.totalAchievements} achievements.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.slice(0, 4).map((ach, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
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
            )}
        </div>
      </div>
    </div>
  );
}
