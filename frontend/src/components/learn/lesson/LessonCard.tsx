// src/pages/lesson/card.tsx
import { useCallback } from "react";
import { cn } from "../../../lib/utils";

type CardProps = {
  id: number;
  text: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
};

export const Card = ({
  text,
  selected,
  onClick,
  status,
  disabled,
}: CardProps) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 hover:bg-[#e8f4f9] active:border-b-2 lg:p-6",
        selected && "border-[#5bb4e5] bg-[#e8f4f9] hover:bg-[#e8f4f9]",
        selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
        selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white"
      )}
    >
      <p
        className={cn(
          "text-sm text-[#0a2540] lg:text-base",
          selected && "text-[#0a3b56]",
          selected && status === "correct" && "text-green-500",
          selected && status === "wrong" && "text-rose-500"
        )}
      >
        {text}
      </p>
    </div>
  );
};