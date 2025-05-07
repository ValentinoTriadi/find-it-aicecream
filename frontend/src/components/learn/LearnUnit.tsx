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
  userLearnProgress: { lessonId: number; completed: boolean }[];
};

export const Unit = ({
  id,
  title,
  description,
  lessons,
  userLearnProgress,
}: UnitProps) => {
  // Set of completed lesson IDs
  const completedLessonIds = new Set(
    userLearnProgress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  return (
    <>
      <UnitBanner title={title} description={description} />

      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, i) => {
          const isFirst = i === 0;

          // Lesson dianggap selesai jika ada di completedLessonIds
          const isLessonCompleted = completedLessonIds.has(lesson.id);

          // Lesson pertama: current jika belum selesai
          // Lesson lain: current jika belum selesai dan lesson sebelumnya sudah selesai
          const isCurrent =
            (!isLessonCompleted && isFirst) ||
            (!isLessonCompleted &&
              !isFirst &&
              completedLessonIds.has(lessons[i - 1].id));

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
