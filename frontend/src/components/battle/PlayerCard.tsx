export default function PlayerCard({ name, active }: { name: string; active: boolean }) {
    return (
      <div className={`p-4 rounded-lg ${active ? 'bg-card' : 'bg-secondary-blue'} text-center`}>
        <div>{name}</div>
        {!active && <div className="opacity-50">(Waiting)</div>}
      </div>
    );
  }
  