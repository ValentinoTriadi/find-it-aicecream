import { useEffect, useRef, useState } from 'react';

const ROUND_DURATION = 60000;

interface SyncState {
  round: number;
  playerMuteCount: number;
  enemyMuteCount: number;
  startTimestamp: number;
}

export function useRoundManager(
  totalRounds: number,
  muteLimit: number,
  topicId: string,
  subtopicId: number
) {
  const [round, setRound] = useState(1);
  const [myIndex, setMyIndex] = useState<number>(0);
  const [playerMuteCount, setPlayerMuteCount] = useState(0);
  const [enemyMuteCount, setEnemyMuteCount] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [roundTime, setRoundTime] = useState(ROUND_DURATION);
  const [progress, setProgress] = useState(1);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("match_token") || crypto.randomUUID();
    localStorage.setItem("match_token", token);


    const wsUrl = `${import.meta.env.VITE_WEB_SOCKET_URL}/ws?topic_id=${topicId}&subtopic_id=${subtopicId}&token=${token}`;
    const socket = new WebSocket(wsUrl);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'match-found') {
          setMyIndex(data.data.myIndex);
        } else if (data.event === 'sync-state') {
          const state: SyncState = data.data;
          setRound(state.round);
          setPlayerMuteCount(state.playerMuteCount);
          setEnemyMuteCount(state.enemyMuteCount);
          setStartTimestamp(state.startTimestamp);
        }
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    };

    return () => {
      socket.close();
    };
  }, [topicId, subtopicId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const timeLeft = Math.max(ROUND_DURATION - elapsed, 0);
      setRoundTime(timeLeft);
      setProgress(timeLeft / ROUND_DURATION);

      if (timeLeft <= 0 && isMyTurn()) {
        advanceRound();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [round, startTimestamp]);

  const isMyTurn = () => round % 2 === myIndex;

  const advanceRound = () => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'update-state',
          data: {
            round: round + 1,
          },
        })
      );
    }
  };

  const updateMuteCount = (type: 'player' | 'enemy', count: number) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'update-state',
          data: type === 'player'
            ? { playerMuteCount: count }
            : { enemyMuteCount: count },
        })
      );
    }
  };

  const checkGameOver = () =>
    round > totalRounds || playerMuteCount >= muteLimit || enemyMuteCount >= muteLimit;

  return {
    round,
    myIndex,
    roundTime,
    progress,
    playerMuteCount,
    enemyMuteCount,
    isMyTurn,
    setPlayerMuteCount: (v: number) => updateMuteCount('player', v),
    setEnemyMuteCount: (v: number) => updateMuteCount('enemy', v),
    advanceRound,
    checkGameOver,
  };
}
