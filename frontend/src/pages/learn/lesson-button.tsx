// src/pages/learn/lesson-button.tsx
import { Check, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { cn } from "../../lib/utils";

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  completed?: boolean;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  completed,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = completed;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = `/learn/${id}`;

  return (
    <Link
      to={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-[#5bb4e5]">
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent border-t-white"
                aria-hidden
              />
            </div>
            <Button
              variant={locked ? "outline" : "default"}
              className="h-[70px] w-[70px] rounded-full border-b-4 border-[#3a9bd5] bg-[#5bb4e5] hover:bg-[#3a9bd5]"
            >
              <Icon
                className={cn(
                  "h-10 w-10 text-white",
                  locked ? "opacity-50" : "",
                  isCompleted && "fill-none stroke-[4]"
                )}
              />
            </Button>
          </div>
        ) : (
          <Button
            variant={locked ? "outline" : "default"}
            className="h-[70px] w-[70px] rounded-full border-b-4 border-[#3a9bd5] bg-[#5bb4e5] hover:bg-[#3a9bd5]"
          >
            <Icon
              className={cn(
                "h-10 w-10 text-white",
                locked ? "opacity-50" : "",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};