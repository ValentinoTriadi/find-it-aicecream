interface StatsTabProps {
    stats: {
      speaking: number;
      vocabulary: number;
      grammar: number;
      listening: number;
    };
  }
  
  export default function StatsTab({ stats }: StatsTabProps) {
    const average =
      (stats.speaking + stats.vocabulary + stats.grammar + stats.listening) / 4;
  
    return (
      <div className="bg-secondary-blue p-4 rounded">
        <p className="text-2xl font-bold text-dark-blue">{Math.round(average)}%</p>
        <p className="text-sm text-primary-border-fg mb-2">Overall Performance</p>
        <ul className="text-sm text-primary-border-fg">
          <li>Speaking: {stats.speaking}%</li>
          <li>Vocabulary: {stats.vocabulary}%</li>
          <li>Grammar: {stats.grammar}%</li>
          <li>Listening: {stats.listening}%</li>
        </ul>
      </div>
    );
  }
  