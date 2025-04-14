// src/pages/learn/index.tsx
import { Unit } from '@/components/learn/LearnUnit';
import {
  Award,
  BarChart2,
  BookOpen,
  MessageSquare,
  Swords,
} from 'lucide-react';
import { useState } from 'react';

// Sample data structure matching your schema
const sampleUnits = [
  {
    id: 1,
    order: 1,
    title: 'Basic Vocabulary',
    description: 'Learn essential words and phrases',
    lessons: [
      {
        id: 1,
        title: 'Greetings',
        challenges: [{ id: 1 }, { id: 2 }],
        completed: false,
      },
      {
        id: 2,
        title: 'Numbers',
        challenges: [{ id: 3 }, { id: 4 }],
        completed: false,
      },
      {
        id: 3,
        title: 'Common Objects',
        challenges: [{ id: 5 }, { id: 6 }],
        completed: false,
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: 'Grammar Fundamentals',
    description: 'Understand basic sentence structures',
    lessons: [
      {
        id: 4,
        title: 'Present Tense',
        challenges: [{ id: 7 }, { id: 8 }],
        completed: false,
      },
      {
        id: 5,
        title: 'Pronouns',
        challenges: [{ id: 9 }, { id: 10 }],
        completed: false,
      },
    ],
  },
];

// Sample user progress data
const userChallengeProgress = [
  { challengeId: 1, completed: true },
  { challengeId: 2, completed: true },
  { challengeId: 3, completed: false },
  // ... other challenges
];

export default function LearnPage() {
  const [learnUnits, setLearnUnits] = useState(sampleUnits);

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        {learnUnits.map((unit) => (
          <div key={unit.id} className="mb-8">
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
  );
}
