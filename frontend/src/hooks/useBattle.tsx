import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useVoiceInput } from './useVoiceInput';

interface UseBattleOptions {
  topic: string;

  muteLimit: number;
  roomId: string;
  objectives: {
    user1: string[];
    user2: string[];
  };
}

export function useBattle({
  muteLimit,
  roomId,
  objectives,
}: UseBattleOptions) {
  const ROUND_DURATION = 60000;
  const token = sessionStorage.getItem('match_token') || crypto.randomUUID();
  sessionStorage.setItem('match_token', token);

  const socketRef = useRef<WebSocket | null>(null);

  const [round, setRound] = useState(1);
  const [myIndex, setMyIndex] = useState<number>(() => {
    const stored = sessionStorage.getItem('battle_my_index');
    return stored !== null ? parseInt(stored) : -1;
  });

  const [completedObjectives, setCompletedObjectives] = useState<{
    user1: string[];
    user2: string[];
  }>({ user1: [], user2: [] });

  const [playerMuteCount, setPlayerMuteCount] = useState(0);
  const [enemyMuteCount, setEnemyMuteCount] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [progress, setProgress] = useState(1);
  const [micError, setMicError] = useState('');
  const [micStarted, setMicStarted] = useState(false);

  const isMyTurn = () => round % 2 === myIndex;

  const { startListening, stopListening, listening } = useVoiceInput({
    onResult: (text) => {
      setMicError('');
      setMicStarted(false);
      setTranscript(text);
      setPlayerMuteCount(0);
    },
    onError: () => {
      setMicError('❌ Your voice could not be recognized. Please try again.');
      setMicStarted(false);
      setTranscript('');
      stopListening();
    },
    onSilentTimeout: () => {
      if (isMyTurn()) {
        setPlayerMuteCount((count) => count + 1);
        advanceRound();
      } else {
        setEnemyMuteCount((count) => count + 1);
      }
    },
  });

  const completeObjective = (user: 'user1' | 'user2', objective: string) => {
    setCompletedObjectives((prev) => ({
      ...prev,
      [user]: [...new Set([...prev[user], objective])],
    }));
  };

  useEffect(() => {
    const wsUrl = `ws://localhost:8000/ws/battle?room_id=${roomId}&token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'sync-state') {
          const state = data.data;
          setRound(state.round);
          setPlayerMuteCount(state.playerMuteCount);
          setEnemyMuteCount(state.enemyMuteCount);
          setStartTimestamp(state.startTimestamp);
        } else if (data.event === 'message') {
          setConversation((prev) => [...prev, data.data]);
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    return () => {
      socket.close();
    };
  }, [roomId, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.max(
        ROUND_DURATION - (Date.now() - startTimestamp),
        0,
      );
      setProgress(timeLeft / ROUND_DURATION);

      if (timeLeft <= 0 && isMyTurn()) {
        advanceRound();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [round, startTimestamp]);

  const advanceRound = () => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'update-state',
          data: {
            round: round + 1,
            startTimestamp: Date.now(),
          },
        }),
      );
    }
    setTranscript('');
    setMicStarted(false);
    stopListening();
  };

  const handleMicClick = () => {
    setMicError('');
    setTranscript('');
    setMicStarted(true);
    startListening();
  };

  const handleSubmit = async () => {
    if (!isMyTurn()) return;

    const socket = socketRef.current;
    const messagePayload = {
      event: 'message',
      data: {
        type: 'playerTurn',
        round,
        player: myIndex,
        transcript,
      },
    };

    socket?.send(JSON.stringify(messagePayload));

    // ✅ AI Objective Checking (POST /api/ai/objectives)
    try {
      const conversationText = [
        ...conversation,
        { player: myIndex, transcript },
      ]
        .map(
          (msg) =>
            `${msg.player === myIndex ? 'user1' : 'user2'}: ${msg.transcript}`,
        )
        .join('\n');

      const response = await axios.post('/api/ai/objectives', {
        topic: 'Current Topic',
        conversation: conversationText,
        role: {
          user1: 'player',
          user2: 'enemy',
        },
        objective: objectives,
      });

      const result = response.data.objectives;
      for (const user in result) {
        for (const objective in result[user]) {
          if (result[user][objective]) {
            completeObjective(user as 'user1' | 'user2', objective);
          }
        }
      }
    } catch (e) {
      console.error('❌ Objective evaluation failed:', e);
    }

    advanceRound();
  };

  const checkGameOver = () => {
    const allCompleted = Object.entries(objectives).every(
      ([user, required]) => {
        const done = completedObjectives[user as 'user1' | 'user2'] || [];
        return required.every((obj) => done.includes(obj));
      },
    );

    return (
      allCompleted ||
      playerMuteCount >= muteLimit ||
      enemyMuteCount >= muteLimit
    );
  };

  return {
    round,
    myIndex,
    isMyTurn,
    progress,
    roundTime: ROUND_DURATION,
    transcript,
    conversation,
    micStarted,
    micError,
    listening,
    setTranscript,
    setMicStarted,
    handleMicClick,
    handleSubmit,
    checkGameOver,
    completeObjective,
    setPlayerMuteCount: (count: number) => setPlayerMuteCount(count),
    setEnemyMuteCount: (count: number) => setEnemyMuteCount(count),
  };
}
