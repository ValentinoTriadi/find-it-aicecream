// src/pages/lesson/quiz.tsx
import { useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import { toast } from "sonner";

import { ChallengeCard } from "./ChallengeCard";
import { LessonFooter } from "./LessonFooter";
import { LessonHeader } from "./LessonHeader";
import { markLessonComplete } from "@/api/learn";
import { get } from "http";
import { useUser } from "@/context/user.context";

type QuizProps = {
  lesson: {
    id: number;
    title: string;
    challenges: {
      id: number;
      question: string;
      challengeOptions: { id: number; text: string; correct: boolean }[];
      completed: boolean;
    }[];
  };
  isLessonCompleted: boolean;
  markChallengeComplete: (challengeId: number) => Promise<void>;
};

export const Quiz = ({
  lesson,
  isLessonCompleted,
  markChallengeComplete,
}: QuizProps) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<
    "correct" | "wrong" | "none" | "completed"
  >(isLessonCompleted ? "completed" : "none");
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const challenge = lesson.challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const { user } = useUser();

  const onSelect = (id: number) => {
    setSelectedOption(id);
    setStatus("none");
  };

  const onContinue = () => {
    if (!challenge) return;

    const correctOption = options.find((option) => option.correct);
    if (correctOption?.id === selectedOption) {
      setStatus("correct");
      markChallengeComplete(challenge.id)
        .then(() => {
          if (activeIndex < lesson.challenges.length - 1) {
            setActiveIndex((prev) => prev + 1);
            setSelectedOption(undefined);
            setStatus("none");
          } else {
            setStatus("completed");
            setShowConfetti(true);
            if (user) {
              markLessonComplete(user.id, lesson.id); // Tandai lesson selesai di DB
            } else {
              toast.error("User not found. Please log in again.");
            }
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    } else if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
    } else {
      setStatus("wrong");
      toast.error("Incorrect answer. Try again.");
    }
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
          <LessonFooter onCheck={() => navigate("/learn")} status="completed" />
        </div>
      </>
    );
  }

  return (
    <>
      <LessonHeader title={lesson.title} />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 mt-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <ChallengeCard
              options={options}
              question={challenge.question}
              onSelect={onSelect}
              selectedOption={selectedOption}
              disabled={status !== "none"}
              status={status}
            />
          </div>
        </div>
      </div>
      <LessonFooter
        disabled={!selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
