import { useEffect, useState } from "react";

const ROUND_DURATION = 60000

export function useRoundManager(totalRounds: number, muteLimit: number) {
    const [round, setRound] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState<'player' | 'enemy'>('player');
    const [playerMuteCount, setPlayerMuteCount] = useState(0);
    const [enemyMuteCount, setEnemyMuteCount] = useState(0);
    const [roundTime, setRoundTime] = useState(ROUND_DURATION);
    const [progress, setProgress] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoundTime(prev => {
            const next = prev - 100;
            setProgress(Math.max(next / ROUND_DURATION, 0));
            if (next <= 0) {
                advanceRound();
                return ROUND_DURATION; // reset to full duration
            }
            return next;
            });
        }, 100);
    
        return () => clearInterval(interval);
    }, [round])
  
    const advanceRound = () => {
      setCurrentPlayer(prev => (prev === 'player' ? 'enemy' : 'player'));
      setRound(r => r + 1);
      setRoundTime(ROUND_DURATION); 
      setProgress(1);
    };
  
    const checkGameOver = () => {
      if (round > totalRounds || playerMuteCount >= muteLimit || enemyMuteCount >= muteLimit) {
        
        return true;
      }
      return false;
    };

    return {
      round,
      currentPlayer,
      setCurrentPlayer,
      playerMuteCount,
      enemyMuteCount,
      setPlayerMuteCount,
      setEnemyMuteCount,
      advanceRound,
      checkGameOver,
      progress
    };
  }
  