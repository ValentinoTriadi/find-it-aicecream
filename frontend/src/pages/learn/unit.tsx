// src/pages/learn/unit.tsx
import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type Lesson = {
  id: number;
  challenges: { id: number }[];
  completed?: boolean;
};

type UnitProps = {
  id: number;
  title: string;
  order: number;
  description: string;
  lessons: Lesson[];
  userChallengeProgress: { challengeId: number; completed: boolean }[];
};

export const Unit = ({ 
  id,
  title, 
  description, 
  lessons, 
  userChallengeProgress 
}: UnitProps) => {
  const completedChallengeIds = new Set(
    userChallengeProgress
      .filter((progress) => progress.completed)
      .map((progress) => progress.challengeId)
  );

  return (
    <>
      <UnitBanner title={title} description={description} />

      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, i) => {
          const isLessonCompleted = lesson.challenges.every(
            (challenge) => completedChallengeIds.has(challenge.id)
          );

          const isCurrent = !isLessonCompleted && 
            (i === 0 || lessons[i-1].challenges.every(ch => 
              completedChallengeIds.has(ch.id)));

          const isLocked = !isLessonCompleted && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={i}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              completed={isLessonCompleted}
            />
          );
        })}
      </div>
    </>
  );
};