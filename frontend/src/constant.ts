export interface Topic {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  subtopic: SubTopic[];
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
  roles: {
    name: string;
    desc: string;
  }[];
}
