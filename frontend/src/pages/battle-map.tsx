'use client';

import { SubtopicMap } from '@/components/battle-map/SubtopicMap';
import { TopicExplorer } from '@/components/battle-map/TopicExplorer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SubTopic, Topic } from '@/constant';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Plane,
  ShoppingBag,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';

const SUBTOPIC_CATEGORIES: SubTopic[] = [
  {
    id: 1,
    name: 'Order',
    level: '1-1',
    description:
      'Learn how to follow and give basic orders in everyday situations.',
    points: 50,
    stars: 1,
    unlocked: true,
    battleWon: 3,
    averageTime: 115,
    bestScore: 85,
    roles: [
      { name: 'Leader', desc: 'Gives instructions to teammates' },
      { name: 'Follower', desc: 'Executes tasks based on given orders' },
    ],
  },
  {
    id: 2,
    name: 'Order-2',
    level: '1-2',
    description: 'Practice more complex command structures and interactions.',
    points: 100,
    stars: 0,
    unlocked: true,
    battleWon: 1,
    averageTime: 132,
    bestScore: 72,
    roles: [
      { name: 'Commander', desc: 'Directs team strategy and calls out plays' },
      {
        name: 'Operator',
        desc: 'Carries out tactical actions based on commands',
      },
    ],
  },
  {
    id: 3,
    name: 'Locked 1',
    level: '1-3',
    description:
      'Advanced coordination between roles for time-sensitive missions.',
    points: 200,
    stars: 0,
    unlocked: false,
    battleWon: 0,
    averageTime: 0,
    bestScore: 0,
    roles: [
      {
        name: 'Strategist',
        desc: 'Analyzes the battlefield and adjusts plans',
      },
      { name: 'Executor', desc: 'Executes high-risk and precise tasks' },
    ],
  },
  {
    id: 4,
    name: 'Locked 2',
    level: '1-4',
    description:
      'Engage in multi-role scenarios requiring perfect timing and synergy.',
    points: 200,
    stars: 0,
    unlocked: false,
    battleWon: 0,
    averageTime: 0,
    bestScore: 0,
    roles: [
      {
        name: 'Coordinator',
        desc: 'Keeps track of all moving pieces during missions',
      },
      { name: 'Runner', desc: 'Performs key actions quickly and efficiently' },
    ],
  },
  {
    id: 5,
    name: 'Locked 3',
    level: '2-1',
    description: 'Start your next tier of training with hybrid role mechanics.',
    points: 200,
    stars: 0,
    unlocked: false,
    battleWon: 0,
    averageTime: 0,
    bestScore: 0,
    roles: [
      { name: 'Hybrid', desc: 'Combines support and combat capabilities' },
      { name: 'Anchor', desc: 'Holds position and provides stability to team' },
    ],
  },
];

const TOPIC_CATEGORIES: Topic[] = [
  {
    id: 'travel',
    name: 'Travel',
    icon: <Plane className="text-primary-blue w-8 h-8" />,
    color: '#5cb176',
    bgColor: '#5cb176',
    subtopic: SUBTOPIC_CATEGORIES,
  },
  {
    id: 'food',
    name: 'Restaurants',

    icon: <Utensils className="text-primary-blue w-8 h-8" />,
    color: '#ffc83d',
    bgColor: '#ffc83d',
    subtopic: [],
  },
  {
    id: 'shopping',
    name: 'Shopping',

    icon: <ShoppingBag className="text-primary-blue w-8 h-8" />,
    color: '#ef5261',
    bgColor: '#ef5261',
    subtopic: [],
  },
  {
    id: 'essentials',
    name: 'Essentials',

    icon: <Globe className="text-primary-blue w-8 h-8" />,
    color: '#87ceeb',
    bgColor: '#87ceeb',
    subtopic: SUBTOPIC_CATEGORIES,
  },
];

export default function BattlePage() {
  const [isExploring, setIsExploring] = useState(false);
  const [availableTopics, setAvailableTopics] = useState(TOPIC_CATEGORIES);
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_CATEGORIES[0]);
  const [tempSelectedTopic, setTempSelectedTopic] = useState(selectedTopic);

  const handleTempCategorySelect = (categoryId: string) => {
    const topic = availableTopics.find((c) => c.id === categoryId);
    if (topic) setTempSelectedTopic(topic);
  };

  const handleCategorySelect = (categoryId: string) => {
    const topic = availableTopics.find((c) => c.id === categoryId);
    if (topic) {
      setSelectedTopic(topic);
      setTempSelectedTopic(topic);
    }
    setIsExploring(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark-blue">
            {isExploring ? 'Topic Explorer' : 'Battle Map'}
          </h1>
          <Button
            variant="ghost"
            className={cn(
              isExploring
                ? 'text-dark-blue flex items-center gap-2'
                : 'bg-white text-more-stronger-blue border border-more-stronger-blue hover:bg-blue-50',
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
                <ArrowRight className="w-4 h-4 ml-2" />
                Explore All Topics
              </>
            )}
          </Button>
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

        <Card className="p-6 bg-white mt-auto border rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">
                Topic {isExploring ? tempSelectedTopic.id : selectedTopic.id}
              </div>
              <h2 className="text-2xl font-bold text-dark-blue">
                {isExploring ? tempSelectedTopic.name : selectedTopic.name}
              </h2>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            {isExploring ? (
              <>
                <Button
                  variant="outline"
                  className="text-blue-400 border-blue-400"
                  onClick={() => setIsExploring(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel Explore Topic
                </Button>
                <Button
                  className="bg-stronger-blue hover:bg-more-stronger-blue text-white"
                  onClick={() => handleCategorySelect(tempSelectedTopic.id)}
                >
                  Choose Topic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="text-stronger-blue border-stronger-blue bg-white hover:text-more-stronger-blue hover:border-more-stronger-blue"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Topic
                </Button>
                <Button className="bg-stronger-blue hover:bg-more-stronger-blue text-white">
                  Next Topic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
