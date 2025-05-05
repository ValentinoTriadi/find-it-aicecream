// src/pages/learn/unit.tsx
import { LessonButton } from "./LearnButton";
import { UnitBanner } from "./LearnUnitBanner";

type Lesson = {
  id: number;
  challenges: { id: number }[];
  completed?: boolean;
  lessonType: "QUIZ" | "VIDEO";
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
  userChallengeProgress,
}: UnitProps) => {
  // Set of completed challenge IDs
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
          const isFirst = i === 0;

          // Lesson dianggap selesai jika semua challenge selesai (kecuali VIDEO)
          const isLessonCompleted =
            lesson.lessonType === "VIDEO"
              ? false // Atur sesuai progress video jika ada
              : lesson.challenges.length > 0 &&
                lesson.challenges.every((challenge) =>
                  completedChallengeIds.has(challenge.id)
                );

          // Lesson pertama: current jika belum selesai
          // Lesson lain: current jika belum selesai dan lesson sebelumnya sudah selesai
          const isCurrent =
            (!isLessonCompleted && isFirst) ||
            (!isLessonCompleted &&
              !isFirst &&
              lessons[i - 1].lessonType !== "VIDEO" &&
              lessons[i - 1].challenges.every((ch) =>
                completedChallengeIds.has(ch.id)
              ));

          // Lesson yang belum selesai dan bukan current = locked
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
