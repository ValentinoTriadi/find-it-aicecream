import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Repeat, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

import AchievementTab from './AchievementTab';
import FeedbackTab from './FeedbackTab';
import StatsTab from './StatsTab';

const tabs = ['Achievement', 'Stats', 'Feedback'];

interface BattlePopupProps {
  round: number;
  topicName: string;
  onContinue: () => void;
  onRetry: () => void;
}

interface Stats {
  speaking: number;
  vocabulary: number;
  grammar: number;
  listening: number;
}

interface Feedback {
  input: string;
  comment: string;
}

interface Achievement {
  title: string;
  description: string;
  completed: boolean;
}

export default function BattlePopup({
  round,
  topicName,
  onContinue,
  onRetry,
}: BattlePopupProps) {
  const [activeTab, setActiveTab] = useState('Achievement');
  const [stats, setStats] = useState<Stats | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [exp, setExp] = useState(0);

  useEffect(() => {
    // 🔁 Replace with actual API logic if needed
    const mockStats: Stats = {
      speaking: 72,
      vocabulary: 80,
      grammar: 60,
      listening: 70,
    };

    const mockFeedback: Feedback[] = [
      {
        input:
          'Excuse me, I just ordered but I want to check other menu as well.',
        comment:
          "Good job with your vocabulary usage! You correctly used 'menu', 'order', and 'check' in context.",
      },
      {
        input: 'Can I get another one?',
        comment:
          'You correctly asked for a replacement. Nice use of polite request.',
      },
    ];

    const mockAchievements: Achievement[] = [
      {
        title: 'First Victory',
        description: 'Win your first battle',
        completed: true,
      },
      {
        title: 'Quick Thinker',
        description: 'Respond within 5 seconds',
        completed: false,
      },
    ];

    setStats(mockStats);
    setFeedback(mockFeedback);
    setAchievements(mockAchievements);
    setExp(505);
  }, []);

  if (!stats) return null; // or a loader

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
            {activeTab === 'Feedback' && <FeedbackTab feedback={feedback} />}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={onRetry}
              className="px-4 py-2 border border-stronger-blue text-stronger-blue rounded-sm bg-white"
              variant={'outline'}
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
