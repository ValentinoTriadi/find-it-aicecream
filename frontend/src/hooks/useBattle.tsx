import { useEffect, useRef, useState } from 'react';
import { useVoiceInput } from './useVoiceInput';

interface UseBattleOptions {
  
  totalRounds: number;
  muteLimit: number;
  roomId: string;
}

export function useBattle({
  
  totalRounds,
  muteLimit,
  roomId,
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

  const [playerMuteCount, setPlayerMuteCount] = useState(0);
  const [enemyMuteCount, setEnemyMuteCount] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [progress, setProgress] = useState(1);
  const [micError, setMicError] = useState('');
  const [micStarted, setMicStarted] = useState(false);

  const isMyTurn = () => {
    const turn = round % 2 === myIndex;
    
    return turn;
  };

  const { startListening, stopListening, listening } = useVoiceInput({
    onResult: (text) => {
      console.log(`[VOICE RESULT] Received: ${text}`);
      setMicError('');
      setMicStarted(false);
      setTranscript(text);
      setPlayerMuteCount(0);
    },
    onError: () => {
      console.log(`[VOICE ERROR] Mic error occurred`);
      setMicError('❌ Your voice could not be recognized. Please try again.');
      setMicStarted(false);
      setTranscript('');
      stopListening();
    },
    onSilentTimeout: () => {
      console.log(`[VOICE TIMEOUT] Silent timeout triggered`);
      if (isMyTurn()) {
        console.log(`[TIMEOUT] Player missed turn. Advancing round.`);
        setPlayerMuteCount((count) => count + 1);
        advanceRound();
      } else {
        setEnemyMuteCount((count) => count + 1);
      }
    },
  });

  useEffect(() => {
    const wsUrl = `ws://localhost:8000/ws/battle?room_id=${roomId}&token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    console.log(`[SOCKET INIT] Connecting to: ${wsUrl}`);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WS RECEIVED]', data);

        if (data.event === 'sync-state') {
          const state = data.data;
          console.log(`[SYNC STATE]`, state);
          setRound(state.round);
          setPlayerMuteCount(state.playerMuteCount);
          setEnemyMuteCount(state.enemyMuteCount);
          setStartTimestamp(state.startTimestamp);
        } else if (data.event === 'message') {
          console.log('[NEW MESSAGE]', data.data);
          setConversation((prev) => [...prev, data.data]);
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    socket.onerror = (e) => {
      console.error('❌ WebSocket error:', e);
    };

    socket.onclose = () => {
        console.log('🔌 WebSocket disconnected, clearing session data');
        sessionStorage.removeItem('match_token');
        sessionStorage.removeItem('battle_my_index');
      };
      

    return () => {
      socket.close();
    };
  }, [roomId, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.max(ROUND_DURATION - (Date.now() - startTimestamp), 0);
      setProgress(timeLeft / ROUND_DURATION);

      if (timeLeft <= 0 && isMyTurn()) {
        console.log('[TIMER] Round expired. Auto advancing...');
        advanceRound();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [round, startTimestamp]);

  const advanceRound = () => {
    const socket = socketRef.current;
    console.log(`[ADVANCE ROUND] From round ${round} → ${round + 1}`);
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'update-state',
          data: {
            round: round + 1,
            startTimestamp: Date.now(),
          },
        })
      );
    }
    setTranscript('');
    setMicStarted(false);
    stopListening();
  };

  const handleMicClick = () => {
    console.log(`[MIC CLICKED]`);
    setMicError('');
    setTranscript('');
    setMicStarted(true);
    startListening();
  };

  const handleSubmit = () => {
    if (!isMyTurn()) {
      console.warn(`[SUBMIT BLOCKED] Not your turn.`);
      return;
    }

    const socket = socketRef.current;
    socket?.send(
      JSON.stringify({
        event: 'message',
        data: {
          type: 'playerTurn',
          round,
          player: myIndex,
          transcript,
        },
      })
    );

    advanceRound();
  };

  const checkGameOver = () =>
    round > totalRounds ||
    playerMuteCount >= muteLimit ||
    enemyMuteCount >= muteLimit;

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
    setPlayerMuteCount: (count: number) => setPlayerMuteCount(count),
    setEnemyMuteCount: (count: number) => setEnemyMuteCount(count),
  };
}
