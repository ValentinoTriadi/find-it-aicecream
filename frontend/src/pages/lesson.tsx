// src/pages/lesson/[id].tsx
import { Quiz } from '@/components/learn/lesson/Quiz';
import { VideoPlayer } from '@/components/learn/lesson/VideoPlayer';
import { Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Dummy data
const dummyLessons = [
  {
    id: 1,
    title: 'Basic Vocabulary',
    lessonType: 'QUIZ',
    challenges: [
      {
        id: 1,
        question: "What does 'hello' mean?",
        challengeOptions: [
          { id: 1, challengeId: 1, text: 'Greeting', correct: true },
          { id: 2, challengeId: 1, text: 'Farewell', correct: false },
          { id: 3, challengeId: 1, text: 'Question', correct: false },
          { id: 4, challengeId: 1, text: 'Answer', correct: false },
        ],
      },
      {
        id: 2,
        question: "What does 'goodbye' mean?",
        challengeOptions: [
          { id: 5, challengeId: 2, text: 'Greeting', correct: false },
          { id: 6, challengeId: 2, text: 'Farewell', correct: true },
          { id: 7, challengeId: 2, text: 'Question', correct: false },
          { id: 8, challengeId: 2, text: 'Answer', correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 2,
    title: 'Grammar Basics',
    lessonType: 'VIDEO',
    challenges: [],
    videoUrl: 'dQw4w9WgXcQ', // Example YouTube video ID
  },
];

const dummyUserProgress = [
  { challengeId: 1, completed: false },
  { challengeId: 2, completed: false },
];

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(
    dummyLessons.find((l) => l.id === Number(id)),
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
            onClick={() => navigate('/learn')}
          >
            <ArrowLeft className="text-stronger-blue" />{' '}
            <span className="text-stronger-blue">Back to Learn</span>
          </Button>
        </div>
      </div>
    );

  const isLessonCompleted = lesson.challenges.every((challenge) =>
    userChallengeProgress.some(
      (progress) => progress.challengeId === challenge.id && progress.completed,
    ),
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
      {lesson.lessonType === 'QUIZ' ? (
        <Quiz
          lesson={{
            ...lesson,
            challenges: lesson.challenges.map((challenge) => ({
              ...challenge,
              completed: userChallengeProgress.some(
                (p) => p.challengeId === challenge.id && p.completed,
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
