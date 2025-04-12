import { BarChart2, Swords, Star } from 'lucide-react';

interface StatsTabProps {
  skills: Record<string, number>;
  battleStats: {
    battlesWon: number;
    battleStars: number;
    averageScore: number;
  };
}

export default function StatsTab({ skills, battleStats }: StatsTabProps) {
  const renderStars = (count: number) =>
    Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < count ? 'fill-[#ffc107] text-[#ffc107]' : 'text-gray-300'
        }`}
      />
    ));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="w-5 h-5 text-dark-blue" />
          <h3 className="text-lg font-semibold text-dark-blue">Performance</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(skills).map(([skill, stars]) => (
            <div className="flex justify-between items-center" key={skill}>
              <span className="text-gray-600">{skill}</span>
              <div className="flex">{renderStars(stars)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Swords className="w-5 h-5 text-dark-blue" />
          <h3 className="text-lg font-semibold text-dark-blue">Battle Stats</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Battles Won</span>
            <span className="font-medium text-dark-blue">{battleStats.battlesWon}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Battle Star</span>
            <span className="font-medium text-dark-blue">{battleStats.battleStars}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average Score</span>
            <span className="font-medium text-dark-blue">{battleStats.averageScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
