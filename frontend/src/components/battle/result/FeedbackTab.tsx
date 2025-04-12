interface FeedbackTabProps {
  feedback: { input: string; comment: string }[];
}

export default function FeedbackTab({ feedback }: FeedbackTabProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-dark-blue text-xl font-bold">Detailed Feedback</h1>
      <div className="flex flex-col gap-1 overflow-y-scroll">
        {feedback.map((entry, i) => (
          <div key={i} className="border p-3 rounded bg-background">
            <p className="text-sm text-dark-blue mb-1">{entry.input}</p>
            <p className="text-xs text-bold-blue">{entry.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
