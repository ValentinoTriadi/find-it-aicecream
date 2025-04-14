import { useEffect } from 'react';

export function useScriptHintManager({
  currentPlayer,
  delay,
  onTrigger,
}: {
  currentPlayer: 'player' | 'enemy';
  delay: number;
  onTrigger: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPlayer === 'player') onTrigger();
    }, delay);
    return () => clearTimeout(timer);
  }, [currentPlayer, onTrigger, delay]);
}
