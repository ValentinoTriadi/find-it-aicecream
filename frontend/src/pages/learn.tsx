// src/pages/learn/index.tsx
import { Unit } from "@/components/learn/LearnUnit";
import { useState } from "react";
import { learnUnits as initialLearnUnits } from "@/utils/data-learn";

// Sample user progress data
const userChallengeProgress = [
  { challengeId: 1, completed: false },
  { challengeId: 2, completed: false },
  { challengeId: 3, completed: false },
  { challengeId: 4, completed: false },
  { challengeId: 5, completed: false },
  { challengeId: 6, completed: false },
  { challengeId: 7, completed: false },
  { challengeId: 8, completed: false },
  { challengeId: 9, completed: false },
  { challengeId: 10, completed: false },
  { challengeId: 11, completed: false },
  { challengeId: 12, completed: false },
  { challengeId: 13, completed: false },
  { challengeId: 14, completed: false },
  { challengeId: 15, completed: false },
  { challengeId: 16, completed: false },
  { challengeId: 17, completed: false },
  { challengeId: 18, completed: false },
  { challengeId: 19, completed: false },
  { challengeId: 20, completed: false },
  { challengeId: 21, completed: false },
  { challengeId: 22, completed: false },
  { challengeId: 23, completed: false },
  { challengeId: 24, completed: false },
  { challengeId: 25, completed: false },
  { challengeId: 26, completed: false },
  { challengeId: 27, completed: false },
  { challengeId: 28, completed: false },
  { challengeId: 29, completed: false },
  { challengeId: 30, completed: false },
  { challengeId: 31, completed: false },
  { challengeId: 32, completed: false },
  { challengeId: 33, completed: false },
  { challengeId: 34, completed: false },
  { challengeId: 35, completed: false },
  { challengeId: 36, completed: false },
  { challengeId: 37, completed: false },
  { challengeId: 38, completed: false },
  { challengeId: 39, completed: false },
  { challengeId: 40, completed: false },
];

export default function LearnPage() {
  const [learnUnits, setLearnUnits] = useState(initialLearnUnits);

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
