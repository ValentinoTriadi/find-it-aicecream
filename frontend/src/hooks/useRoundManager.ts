import { useEffect, useState } from "react";
import io from "socket.io-client";



const ROUND_DURATION = 60000;

export function useRoundManager(totalRounds: number, muteLimit: number, topicId : string, subtopicId : number) {
  const [round, setRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'enemy'>('player');
  const [playerMuteCount, setPlayerMuteCount] = useState(0);
  const [enemyMuteCount, setEnemyMuteCount] = useState(0);
  const [roundTime, setRoundTime] = useState(ROUND_DURATION);
  const [progress, setProgress] = useState(1);

  const socket = io(import.meta.env.VITE_WEB_SOCKET_URL, {
    query: { topic_id: topicId, subtopic_id:subtopicId }
  });

  // Listen for state sync
  useEffect(() => {
    socket.on("sync-state", (state) => {
      setRound(state.round);
      setCurrentPlayer(state.currentPlayer);
      setPlayerMuteCount(state.playerMuteCount);
      setEnemyMuteCount(state.enemyMuteCount);
    });

    return () => {
      socket.off("sync-state");
    };
  }, []);

  // Auto timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoundTime(prev => {
        const next = prev - 100;
        setProgress(Math.max(next / ROUND_DURATION, 0));
        if (next <= 0) {
          advanceRound();
          return ROUND_DURATION;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [round]);

  const advanceRound = () => {
    const newPlayer = currentPlayer === 'player' ? 'enemy' : 'player';
    const nextRound = round + 1;
    socket.emit("update-state", {
      round: nextRound,
      currentPlayer: newPlayer,
      roundTime: ROUND_DURATION,
    });
    
  };

  const checkGameOver = () => {
    return (
      round > totalRounds ||
      playerMuteCount >= muteLimit ||
      enemyMuteCount >= muteLimit
    );
  };

  // To update mutes
  const updateMuteCount = (type: 'player' | 'enemy', count: number) => {
    const update = type === 'player' ? { playerMuteCount: count } : { enemyMuteCount: count };
    socket.emit("update-state", update);
  };

  return {
    round,
    currentPlayer,
    playerMuteCount,
    enemyMuteCount,
    setPlayerMuteCount: (val: number) => updateMuteCount('player', val),
    setEnemyMuteCount: (val: number) => updateMuteCount('enemy', val),
    advanceRound,
    checkGameOver,
    progress,
  };
}
