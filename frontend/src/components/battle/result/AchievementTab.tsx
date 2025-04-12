import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

interface AchievementTabProps {
  achievements: { title: string; description: string; completed: boolean }[];
}

export default function AchievementTab({ achievements }: AchievementTabProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {achievements.map((a, idx) => (
        <div
          key={idx}
          className={cn(
            'rounded border p-4',
            a.completed ? 'bg-secondary-blue' : 'bg-background',
          )}
        >
          <div className="flex items-center gap-2">
            <Trophy
              className={cn(
                'w-5 h-5',
                a.completed ? 'text-bolder-blue' : 'text-gray-400',
              )}
            />
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-primary-border-fg">{a.description}</p>
              <p className="text-xs mt-2">
                {a.completed ? (
                  <span className="text-bold-blue">100% Completed</span>
                ) : (
                  'Locked'
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
