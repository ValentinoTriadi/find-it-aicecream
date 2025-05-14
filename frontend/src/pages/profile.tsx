import AchievementTab from "@/components/profile/AchievementTab";
import LevelProgress from "@/components/profile/LevelProgress";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsTab from "@/components/profile/StatsTab";
import { useAuth } from "@/context/auth.context";
import { useUser } from "@/context/user.context";
import {
  Award,
  BarChart2,
  BookOpen,
  MessageSquare,
  Star,
  Swords,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const DummyUserData = {
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

const DummyAchievements = [
  {
    title: "First Battle Won",
    icon: <Trophy className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Win your first battle.",
  },
  {
    title: "Grammar Guru",
    icon: <BookOpen className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Master grammar skills.",
  },
  {
    title: "Vocabulary Vault",
    icon: <Award className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Reach vocab level 3.",
  },
  {
    title: "Listening Legend",
    icon: <BarChart2 className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Level up listening skill.",
  },
  {
    title: "Speak Up!",
    icon: <MessageSquare className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Finish 5 speaking battles.",
  },
  {
    title: "Consistent Learner",
    icon: <Star className="w-5 h-5 text-[#5bb4e5]" />,
    description: "Log in 7 days in a row.",
  },
];
const ProfilePage = () => {
  const auth = useAuth();
  const profile = useUser();
  const [activeTab, setActiveTab] = useState<"Stats" | "Achievement">("Stats");
  const [userData, setUserData] = useState(DummyUserData);
  const [achievements, setAchievements] = useState(DummyAchievements);
  return (
    <div className="flex-1 overflow-auto">
      <div className=" space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          name={auth.user?.user_metadata?.nama}
          joinDate={auth.user?.created_at ?? ""}
          achievementsUnlocked={userData.achievementsUnlocked}
          exp={profile.experience ?? 0}
          dayStreak={14}
          handleLogout={() => auth.logout()}
        />

        {/* Level Progress */}
        <div className="px-6">
          <LevelProgress exp={profile.experience ?? 0} />
        </div>
        {/* Tabs */}
        <div className="mb-2 w-full px-6">
          <div className="grid grid-cols-2 gap-1 mb-4 shadow-md bg-white rounded-md p-1 w-full ">
            {["Stats", "Achievement"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "Stats" | "Achievement")}
                className={`px-6 col-span-1 py-2 rounded-md ${
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

        {/* Tab Content */}
        <div className="px-6">
          {activeTab === "Stats" && (
            <StatsTab
              skills={userData.skills}
              battleStats={userData.battleStats}
            />
          )}

          {activeTab === "Achievement" && (
            <AchievementTab
              unlocked={userData.achievementsUnlocked}
              total={userData.totalAchievements}
              achievements={achievements}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
