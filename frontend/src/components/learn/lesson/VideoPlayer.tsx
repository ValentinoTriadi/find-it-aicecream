// src/pages/lesson/video.tsx
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import { LessonFooter } from './LessonFooter';
import { LessonHeader } from './LessonHeader';

type VideoPlayerProps = {
  lesson: {
    id: number;
    title: string;
    videoUrl: string | null;
  };
  isLessonCompleted: boolean;
  markLessonComplete: (lessonId: number) => Promise<void>;
};

export const VideoPlayer = ({
  lesson,
  isLessonCompleted,
  markLessonComplete,
}: VideoPlayerProps) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(isLessonCompleted);
  const [showConfetti, setShowConfetti] = useState(false);

  const onComplete = async () => {
    try {
      await markLessonComplete(lesson.id);
      setIsCompleted(true);
      setShowConfetti(true);
    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
    }
  };

  const onContinue = () => {
    navigate('/learn');
  };

  if (showConfetti) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <div className="text-6xl lg:text-8xl">🎉</div>

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You've completed the lesson.
          </h1>
        </div>
        <LessonFooter onCheck={onContinue} status="completed" />
      </>
    );
  }

  return (
    <>
      <LessonHeader title={lesson.title} />

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-3xl">
          {lesson.videoUrl ? (
            <iframe
              src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
              className="w-full aspect-video rounded-md shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-center text-red-500">Video not available.</p>
          )}
        </div>
      </div>

      <LessonFooter
        disabled={false}
        status={isCompleted ? 'completed' : 'none'}
        onCheck={onComplete}
        isVideoLesson
      />
    </>
  );
};
