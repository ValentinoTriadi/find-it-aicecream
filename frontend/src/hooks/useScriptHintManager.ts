import { useEffect } from 'react';
import axios from 'axios';

export function useScriptHintManager({
  currentPlayer,
  delay,
  onTrigger,
  conversation,
}: {
  currentPlayer: 'player' | 'enemy';
  delay: number;
  onTrigger: (hint: string) => void;
  conversation: any[];
}) {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.post('/api/ai/script', {
          user: currentPlayer === 'player' ? 'user1' : 'user2',
          conversation,
        });

        const hint = res.data.script || 'Try saying something.';
        onTrigger(hint);
      } catch {
        onTrigger('Try asking something engaging.');
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [conversation, currentPlayer]);
}
