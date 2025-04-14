import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Repeat, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

import AchievementTab from './AchievementTab';
import FeedbackTab from './FeedbackTab';
import StatsTab from './StatsTab';
import { Button } from '@/components/ui/button';

const tabs = ['Achievement', 'Stats', 'Feedback'];

interface BattlePopupProps {
  topicName: string;
  conversation: any[];
  score: {
    user1: number | string;
    user2: number | string;
  };
  feedback: {
    user1: string;
    user2: string;
  };
  objectives: {
    user1: Record<string, boolean>;
    user2: Record<string, boolean>;
  };
  onContinue: () => void;
  onRetry: () => void;
}

export interface FeedbackItem {
  input: string;
  comment: string;
}

export interface Achievement {
  title: string;
  description: string;
  completed: boolean;
}

export default function BattlePopup({
  topicName,
  conversation,
  score,
  feedback,
  objectives,
  onContinue,
  onRetry,
}: BattlePopupProps) {
  const [activeTab, setActiveTab] = useState('Achievement');
  const [stats, setStats] = useState({
    speaking: 0,
    vocabulary: 0,
    grammar: 0,
    listening: 0,
  });
  const [formattedFeedback, setFormattedFeedback] = useState<FeedbackItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [exp, setExp] = useState(0);

  useEffect(() => {
    const myIndex = parseInt(sessionStorage.getItem('battle_my_index') || '0');
    const myKey = myIndex === 0 ? 'user1' : 'user2';

    // Set basic scoring (fill in dummy values for now if only one score is provided)
    setStats({
      speaking: Number(score[myKey]) || 60,
      vocabulary: 70,
      grammar: 65,
      listening: 75,
    });

    // Set feedback
    setFormattedFeedback([
      {
        input: 'Overall Performance',
        comment: feedback[myKey],
      },
    ]);

    // Set achievements based on completed objectives
    const achieved = objectives[myKey];
    const achievedList: Achievement[] = Object.entries(achieved).map(([title, completed]) => ({
      title,
      description: `Complete objective: ${title}`,
      completed,
    }));

    setAchievements(achievedList);
    setExp(achievedList.filter((a) => a.completed).length * 100);
  }, [score, feedback, objectives]);

  const average =
    (stats.speaking + stats.vocabulary + stats.grammar + stats.listening) / 4;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-60 z-50 flex items-center justify-center">
      <Card className="bg-white rounded-lg w-full max-w-2xl pt-0 px-0 shadow-md overflow-hidden">
        {/* Header */}
        <CardHeader className="flex justify-between items-center text-white bg-dark-blue px-6 py-4 ">
          <div>
            <h2 className="text-lg font-bold">Victory!</h2>
            <p className="text-sm">{topicName}</p>
            <div className="text-yellow-star text-lg">⭐⭐⭐</div>
          </div>
          <div className="text-sm">
            <Trophy className="inline-block mr-1" />+{exp} Exp
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex space-x-2 mb-2 ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 rounded',
                  activeTab === tab
                    ? 'bg-secondary-blue text-dark-blue font-semibold'
                    : 'bg-background text-primary-border-fg border',
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4 min-h-[200px]">
            {activeTab === 'Achievement' && (
              <AchievementTab achievements={achievements} />
            )}
            {activeTab === 'Stats' && <StatsTab stats={stats} />}
            {activeTab === 'Feedback' && <FeedbackTab feedback={formattedFeedback} />}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={onRetry}
              className="px-4 py-2 border border-stronger-blue text-stronger-blue rounded-sm bg-white"
              variant="outline"
            >
              <Repeat /> Try Again
            </Button>
            <Button
              onClick={onContinue}
              className="px-4 py-4 rounded-sm bg-bolder-blue text-white bg-stronger-blue"
            >
              Continue <ArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
