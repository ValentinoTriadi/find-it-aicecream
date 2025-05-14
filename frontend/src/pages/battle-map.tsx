'use client';

import { SubtopicMap } from '@/components/battle-map/SubtopicMap';
import { TopicExplorer } from '@/components/battle-map/TopicExplorer';
import { calculateExp } from '@/components/profile/LevelProgress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { SubTopic, Topic } from '@/constant';
import {
  TopicCategory,
  useBattleMapSubtopic,
} from '@/context/battle-map.context';
import { useUser } from '@/context/user.context';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Globe,
  Plane,
  Shield,
  ShoppingBag,
  Star,
  Swords,
  Trophy,
  Utensils,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BattlePage() {
  const { topicCategories, userStars } = useBattleMapSubtopic();

  if (topicCategories.length === 0) {
    return 'Loading topic categories';
  }
  if (userStars === -1) {
    return 'Loading stars';
  }

  const isSpeechRecognitionSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const [isExploring, setIsExploring] = useState(false);
  const [availableTopics, setAvailableTopics] = useState(topicCategories);
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>(
    availableTopics[0],
  );
  const [tempSelectedTopic, setTempSelectedTopic] = useState(selectedTopic);

  const [xpAnimation, setXpAnimation] = useState(false);
  const [showReward, setShowReward] = useState(false);

  // Simulate XP gain for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 2000);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleTempCategorySelect = (categoryId: number) => {
    const topic = availableTopics.find((c) => c.id === categoryId);
    if (topic) setTempSelectedTopic(topic);
  };

  const handleCategorySelect = (categoryId: number) => {
    const topic = availableTopics.find((c) => c.id === categoryId);
    if (topic) {
      setSelectedTopic(topic);
      setTempSelectedTopic(topic);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
    setIsExploring(false);
  };
  const profile = useUser();

  if (!profile) {
    return <div>Loading profile data</div>;
  }

  const nextLevel = calculateExp(profile.experience ?? 0);

  return (
    <div className="min-h-screen bg-white px-10 py-6 relative">
      {/* Floating reward animation */}

      {!isSpeechRecognitionSupported && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 border border-red-300 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Your browser does not support voice recpognition features. Please use
          Chrome or another supported browser for the best experience.
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="ml-auto border-red-300 text-red-600 hover:bg-red-50"
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className=" mx-auto">
        {/* Header with User Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-dark-blue p-1 mr-4">
                <div className="w-full h-full rounded-full bg-dark-blue flex items-center justify-center">
                  <span className="text-xl text-white font-bold">LW</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {calculateExp(profile.experience ?? 0).lvl}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-dark-blue">
                {calculateExp(profile.experience ?? 0).role}
              </h2>
              <Badge className="bg-more-stronger-blue text-white">
                Level {calculateExp(profile.experience ?? 0).lvl}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {/* XP Bar */}
            <div className="relative bg-dark-blue text-white px-3 py-1 rounded-full items-center">
              <div className="flex items-center mt-1 gap-1">
                <Zap className="h-4 w-4 text-yellow-400" />
                <div className="w-24 h-2 bg-blue-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000 ${
                      xpAnimation ? 'animate-pulse' : ''
                    }`}
                    style={{
                      width: `${
                        ((profile.experience ?? 0) / nextLevel.maxExp) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs">
                  {profile.experience ?? 0}/{nextLevel.maxExp}
                </span>
              </div>
              {xpAnimation && (
                <div className="absolute -top-3 right-0 text-yellow-300 text-xs font-bold animate-bounce">
                  +15 XP!
                </div>
              )}
            </div>

            {/* Stars */}
            <div className="bg-more-stronger-blue text-white px-3 py-1 rounded-full flex items-center">
              <Star className="h-4 w-4 text-yellow-300 mr-1 fill-yellow-300" />
              <span>{userStars}</span>
            </div>

            {/* Streak */}
            <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
              <Flame className="h-4 w-4 mr-1" />
              <span>{14} day streak</span>
            </div>

            {/* Coins */}
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center">
            {isExploring ? (
              <>
                <Globe className="h-8 w-8 mr-2 text-blue-600" />
                Topic Explorer
              </>
            ) : (
              <>
                <Swords className="h-8 w-8 mr-2 text-blue-600" />
                Battle Map
              </>
            )}
          </h1>
          <Button
            variant={isExploring ? 'ghost' : 'outline'}
            className={cn(
              isExploring
                ? 'text-blue-700 flex items-center gap-2 hover:bg-blue-50'
                : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50',
            )}
            onClick={() => setIsExploring(!isExploring)}
          >
            {isExploring ? (
              <>
                <ArrowLeft className="w-4 h-4" />
                Cancel Explore Topic
              </>
            ) : (
              <>
                Explore All Topics
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Daily Challenge Banner */}
        <div className="mb-6 bg-gradient-to-r from-dark-blue to-dark-blue/80 rounded-xl p-4 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center">
            <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
              <Trophy className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold">Daily Challenge</h3>
              <p className="text-sm text-blue-100">
                Complete 3 battles today for bonus rewards!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-blue-200">Progress</div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="font-bold">1/3</span>
              </div>
            </div>
          </div>
        </div>

        {isExploring ? (
          <TopicExplorer
            availableTopics={availableTopics}
            selectedTopic={tempSelectedTopic}
            handleSelectTopic={handleTempCategorySelect}
          />
        ) : (
          <SubtopicMap selectedTopic={selectedTopic} />
        )}

        <Card className="p-6 bg-white mt-6 border border-blue-200 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-blue-500 text-sm">
                Topic {isExploring ? tempSelectedTopic.id : selectedTopic.id}
              </div>
              <h2 className="text-2xl font-bold text-blue-800">
                {isExploring ? tempSelectedTopic.name : selectedTopic.name}
              </h2>
            </div>

            {/* Topic progress */}
            {!isExploring && (
              <div className="hidden md:block w-1/3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-600 font-medium">
                    Topic Progress
                  </span>
                  <span className="text-blue-800 font-medium">
                    1/5 Completed
                  </span>
                </div>
                <Progress value={20} className="h-2 bg-blue-100">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                </Progress>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            {isExploring ? (
              <>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  onClick={() => setIsExploring(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel Explore Topic
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleCategorySelect(tempSelectedTopic.id)}
                >
                  Choose Topic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Add missing components for the demo
const AlertTriangle = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
