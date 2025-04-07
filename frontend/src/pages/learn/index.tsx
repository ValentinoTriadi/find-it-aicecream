// src/pages/learn/index.tsx
import { useState } from "react";
import { Swords, BookOpen, BarChart2, Award, MessageSquare } from "lucide-react";
import { Unit } from "./unit";

// Sample data structure matching your schema
const sampleUnits = [
  {
    id: 1,
    order: 1,
    title: "Basic Vocabulary",
    description: "Learn essential words and phrases",
    lessons: [
      {
        id: 1,
        title: "Greetings",
        challenges: [{ id: 1 }, { id: 2 }],
        completed: false
      },
      {
        id: 2,
        title: "Numbers",
        challenges: [{ id: 3 }, { id: 4 }],
        completed: false
      },
      {
        id: 3,
        title: "Common Objects",
        challenges: [{ id: 5 }, { id: 6 }],
        completed: false
      },
    ]
  },
  {
    id: 2,
    order: 2,
    title: "Grammar Fundamentals",
    description: "Understand basic sentence structures",
    lessons: [
      {
        id: 4,
        title: "Present Tense",
        challenges: [{ id: 7 }, { id: 8 }],
        completed: false
      },
      {
        id: 5,
        title: "Pronouns",
        challenges: [{ id: 9 }, { id: 10 }],
        completed: false
      },
    ]
  }
];

// Sample user progress data
const userChallengeProgress = [
  { challengeId: 1, completed: true },
  { challengeId: 2, completed: true },
  { challengeId: 3, completed: false },
  // ... other challenges
];

const userProfile = {
  userName: "Maul Firdaus",
  userImageSrc: "/placeholder.svg",
  points: 1250,
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("Learn");

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a2a40] text-white flex flex-col">
        {/* User profile */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <img
              src={userProfile.userImageSrc}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <h2 className="text-xl font-semibold">{userProfile.userName}</h2>
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
                className={`flex items-center gap-3 text-lg font-medium ${
                  activeTab === "Learn" ? "text-[#5bb4e5]" : "hover:text-[#5bb4e5]"
                } transition-colors`}
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
              <a
                href="#"
                className="flex items-center gap-3 text-lg font-medium hover:text-[#5bb4e5] transition-colors"
              >
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
        <div className="max-w-4xl mx-auto">          
          {sampleUnits.map((unit) => (
            <div key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                userChallengeProgress={userChallengeProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}