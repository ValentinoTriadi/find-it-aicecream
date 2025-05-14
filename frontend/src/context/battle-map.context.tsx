import {
  getAllSubTopic,
  getAllTopic,
  getCountStarUser,
} from '@/api/battle-map';
import { Globe, Plane, ShoppingBag, Utensils } from 'lucide-react';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useUser } from './user.context';

// Type definitions
export interface Role {
  name: string;
  desc: string;
}

export interface SubTopic {
  id: number;
  name: string;
  level: string;
  description: string;
  points: number;
  stars: number;
  unlocked: boolean;
  battleWon: number;
  averageTime: number;
  bestScore: number;
  roles: Role[];
  topic_id: number;
}
export interface TopicCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  subtopic: SubTopic[];
}

interface BattleMapSubtopicContextType {
  topicCategories: TopicCategory[];
  userStars: number;
  loading: boolean;
  refresh: () => void;
}

const BattleMapSubtopicContext = createContext<
  BattleMapSubtopicContextType | undefined
>(undefined);

const ICON_MAP: Record<string, React.ReactNode> = {
  travel: <Plane className="text-white w-8 h-8" />,
  restaurants: <Utensils className="text-white w-8 h-8" />,
  shopping: <ShoppingBag className="text-white w-8 h-8" />,
  essentials: <Globe className="text-white w-8 h-8" />,
};

const COLOR_MAP: Record<string, string> = {
  travel: '#5cb176',
  restaurants: '#ffc83d',
  shopping: '#ef5261',
  essentials: '#87ceeb',
};

export const BattleMapSubtopicProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [topicCategories, setTopicCategories] = useState<TopicCategory[]>([]);
  const [userStars, setUserStars] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const profile = useUser();
  const fetchAll = async () => {
    setLoading(true);
    try {
      if (!profile || !profile.user) {
        return;
      }
      const topics = await getAllTopic();
      const star = await getCountStarUser(profile.user.id ?? 0);
      setUserStars(star);
      // Fetch all subtopics for all topics
      const subtopicPromises = topics.map((topic: any) =>
        getAllSubTopic(topic.id),
      );
      const subtopicResults = await Promise.all(subtopicPromises);

      // Map topics to TopicCategory structure
      const categories: TopicCategory[] = topics.map(
        (topic: any, idx: number) => {
          // Use topic.name (lowercase, no space) as key for icon/color, fallback if not found
          const key = topic.name.toLowerCase().replace(/\s/g, '');
          return {
            id: topic.id,
            name: topic.name,
            icon: ICON_MAP[key] || <Plane className="text-white w-8 h-8" />,
            color: COLOR_MAP[key] || '#5cb176',
            bgColor: COLOR_MAP[key] || '#5cb176',
            subtopic: subtopicResults[idx] || [],
          };
        },
      );

      setUserStars(userStars);

      setTopicCategories(categories);
    } catch (err) {
      console.error('Error fetching battlemap subtopics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [profile]);

  return (
    <BattleMapSubtopicContext.Provider
      value={{ topicCategories, userStars, loading, refresh: fetchAll }}
    >
      {children}
    </BattleMapSubtopicContext.Provider>
  );
};

export const useBattleMapSubtopic = (): BattleMapSubtopicContextType => {
  const context = useContext(BattleMapSubtopicContext);
  if (!context) {
    throw new Error(
      'useBattleMapSubtopic must be used within a BattleMapSubtopicProvider',
    );
  }
  return context;
};
