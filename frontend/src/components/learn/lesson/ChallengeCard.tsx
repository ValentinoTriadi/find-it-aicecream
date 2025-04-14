// src/pages/lesson/challenge.tsx
import { cn } from '../../../lib/utils';
import { Card } from './LessonCard';
import { QuestionBubble } from './QuestionBubble';

type ChallengeProps = {
  options: {
    id: number;
    text: string;
    correct: boolean;
  }[];
  question: string;
  onSelect: (id: number) => void;
  status: 'correct' | 'wrong' | 'none' | 'completed';
  selectedOption?: number;
  disabled?: boolean;
};

export const ChallengeCard = ({
  options,
  question,
  onSelect,
  status,
  selectedOption,
  disabled,
}: ChallengeProps) => {
  return (
    <div>
      <QuestionBubble question={question} />
      <div
        className={cn(
          'grid gap-2',
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
        )}
      >
        {options.map((option) => (
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
