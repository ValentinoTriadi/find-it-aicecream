// src/pages/lesson/[id].tsx
import { Quiz } from "@/components/learn/lesson/Quiz";
import { VideoPlayer } from "@/components/learn/lesson/VideoPlayer";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessons } from "@/utils/data-lesson";

const dummyUserProgress = [
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

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(
    lessons.find((l) => l.id === Number(id))
  );
  const [userChallengeProgress, setUserChallengeProgress] =
    useState(dummyUserProgress);

  if (!lesson)
    return (
      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-neutral-700">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Lesson not found.</p>
          <Button
            className="text-stronger-blue flex gap-2"
            onClick={() => navigate("/learn")}
          >
            <ArrowLeft className="text-stronger-blue" />{" "}
            <span className="text-stronger-blue">Back to Learn</span>
          </Button>
        </div>
      </div>
    );

  const isLessonCompleted = lesson.challenges.every((challenge) =>
    userChallengeProgress.some(
      (progress) => progress.challengeId === challenge.id && progress.completed
    )
  );

  // Mock function to update progress
  const markChallengeComplete = (challengeId: number) => {
    setUserChallengeProgress((prev) => [
      ...prev.filter((p) => p.challengeId !== challengeId),
      { challengeId, completed: true },
    ]);
    return Promise.resolve();
  };

  const markLessonComplete = (lessonId: number) => {
    // In a real app, you would update the lesson completion status
    return Promise.resolve();
  };

  return (
    <>
      {lesson.lessonType === "QUIZ" ? (
        <Quiz
          lesson={{
            ...lesson,
            challenges: lesson.challenges.map((challenge) => ({
              ...challenge,
              completed: userChallengeProgress.some(
                (p) => p.challengeId === challenge.id && p.completed
              ),
            })),
          }}
          isLessonCompleted={isLessonCompleted}
          markChallengeComplete={markChallengeComplete}
        />
      ) : (
        <VideoPlayer
          lesson={lesson}
          isLessonCompleted={isLessonCompleted}
          markLessonComplete={markLessonComplete}
        />
      )}
    </>
  );
}
