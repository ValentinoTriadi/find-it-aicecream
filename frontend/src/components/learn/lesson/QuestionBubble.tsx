// src/pages/lesson/question-bubble.tsx
type QuestionBubbleProps = {
  question: string;
};

export const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <img
        src="/images/person-pointing-mascot.png"
        alt="Mascot"
        className="max-lg:h-10 max-lg:w-10 h-[150px] w-[150px] "
      />

      <div className="relative rounded-xl border-2 border-[#5bb4e5] bg-[#e8f4f9] px-4 py-2 text-sm text-[#0a2540] lg:text-base">
        {question}
        <div
          className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent border-t-[#e8f4f9]"
          aria-hidden
        />
      </div>
    </div>
  );
};
