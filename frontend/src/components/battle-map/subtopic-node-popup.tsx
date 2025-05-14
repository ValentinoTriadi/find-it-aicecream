"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SubTopic, TopicCategory } from "@/context/battle-map.context";
import { useMatchmaking } from "@/hooks/useMatchmaking";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Swords,
  Trophy,
  Shield,
  Zap,
  Users,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface TopicNodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  topic: TopicCategory;
  selectedSubtopic: SubTopic | null;
}

export function SubtopicNodePopup({
  isOpen,
  onClose,
  topic,
  selectedSubtopic,
}: TopicNodePopupProps) {
  if (topic == null) return null;
  if (selectedSubtopic == null) return null;

  const navigate = useNavigate();
  const { status, roomId, startMatchmaking } = useMatchmaking(
    topic.id.toString(),
    selectedSubtopic.id?.toString() || topic.id.toString()
  );

  const [showRewards, setShowRewards] = useState(false);
  const [activeTab, setActiveTab] = useState("battle");

  useEffect(() => {
    if (status === "matched" && roomId) {
      navigate(`/battle/${roomId}/${topic.id}/${selectedSubtopic.id}`);
    }
  }, [status, roomId, navigate, topic.id, selectedSubtopic.id]);

  function HandleMatchmaking() {
    startMatchmaking();
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        if (status !== "searching") {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-white max-w-3xl min-w-xl w-2xl overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedSubtopic.level}
                    </span>
                  </div>
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-30"></div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedSubtopic.name}
                  </DialogTitle>
                  <div className="flex mt-2">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedSubtopic.stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-blue-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* XP reward badge */}
              <div className="bg-blue-800/50 px-3 py-1 rounded-full flex items-center backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-bold">
                  {selectedSubtopic.points} XP
                </span>
              </div>
            </div>
          </DialogHeader>
          <DialogClose className="text-white"></DialogClose>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "battle"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("battle")}
          >
            <div className="flex items-center justify-center">
              <Swords className="w-4 h-4 mr-2" />
              Battle Info
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "rewards"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("rewards")}
          >
            <div className="flex items-center justify-center">
              <Trophy className="w-4 h-4 mr-2" />
              Rewards
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "roles"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("roles")}
          >
            <div className="flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              Roles
            </div>
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          {activeTab === "battle" && (
            <>
              <DialogDescription className="text-gray-600 mb-6 gap-2 flex flex-col">
                <div className="flex gap-2 text-blue-600 items-center">
                  <Trophy className="w-4 h-4" />
                  <div className="text-base font-medium">
                    {selectedSubtopic.points} XP Reward
                  </div>
                </div>
                <p className="text-gray-600">
                  {selectedSubtopic.description ||
                    `Learn essential vocabulary and phrases for ${selectedSubtopic.name.toLowerCase()} situations. Practice conversations and improve your speaking skills.`}
                </p>
              </DialogDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Swords className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-800">Battle Stats</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm">Battles Won</span>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedSubtopic.battleWon}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm">Average Time</span>
                      </div>
                      <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                        {Math.floor(selectedSubtopic.averageTime / 60)}m{" "}
                        {selectedSubtopic.averageTime % 60}s
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="text-sm">Best Score</span>
                      </div>
                      <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedSubtopic.bestScore}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-800">
                      Battle Requirements
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm">Minimum Level</span>
                      </div>
                      <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                        Level 3
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <Swords className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-sm">Difficulty</span>
                      </div>
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedSubtopic.id <= 2
                          ? "Easy"
                          : selectedSubtopic.id <= 4
                          ? "Medium"
                          : "Hard"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm">Players Needed</span>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        2 Players
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "rewards" && (
            <div className="py-4">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Battle Rewards
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-1">3 Stars</h4>
                  <p className="text-xs text-gray-600">
                    Complete with 90%+ accuracy
                  </p>
                </div>

                <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-1">
                    {selectedSubtopic.points} XP
                  </h4>
                  <p className="text-xs text-gray-600">
                    Earn XP for each completion
                  </p>
                </div>

                <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-1">
                    Special Badge
                  </h4>
                  <p className="text-xs text-gray-600">
                    Unlock after 5 victories
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                  <Trophy className="w-4 h-4 mr-2" />
                  Bonus Rewards
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Complete in under 2 minutes: +25 XP
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Win 3 battles in a row: Streak bonus
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Help a new player: Mentor badge
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="py-4">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                Battle Roles
              </h3>

              <div className="space-y-4">
                {selectedSubtopic.roles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 mb-1">
                        {role.name}
                      </h4>
                      <p className="text-sm text-gray-600">{role.desc}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {index === 0 ? "Primary Role" : "Support Role"}
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          {index === 0 ? "Speaking Focus" : "Listening Focus"}
                        </span>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {index === 0
                            ? "Leadership +10 XP"
                            : "Teamwork +10 XP"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Role Mastery
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Play each role 5 times to earn the Role Master badge and
                    bonus XP!
                  </p>
                  <div className="flex gap-2">
                    <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {selectedSubtopic.roles[0].name}: 2/5
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {selectedSubtopic.roles[1].name}: 1/5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
            <div className="flex gap-3">
              <Link
                to={`/learn/${selectedSubtopic.id}`}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium text-sm"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Continue Learning
              </Link>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={HandleMatchmaking}
                disabled={status === "searching"}
              >
                {status === "searching" ? (
                  <>
                    Matching...
                    <span className="ml-2 animate-spin">🔄</span>
                  </>
                ) : (
                  <>
                    Start Battle <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
