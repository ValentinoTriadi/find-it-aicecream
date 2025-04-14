import { useEffect, useRef, useState } from 'react';

type MatchmakingState = 'idle' | 'searching' | 'matched';

interface MatchFoundPayload {
  roomId: string;
  myIndex: number;
}

export function useMatchmaking(topicId: string, subtopicId: string) {
  const [status, setStatus] = useState<MatchmakingState>('idle');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [myIndex, setMyIndex] = useState<number | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const startMatchmaking = () => {
    console.log('🎮 Starting matchmaking...');

    const token = sessionStorage.getItem('match_token') || crypto.randomUUID();
    sessionStorage.setItem('match_token', token);

    const wsUrl = `${import.meta.env.VITE_WS_URL}/ws/matchmake?topic_id=${topicId}&subtopic_id=${subtopicId}&token=${token}`;
    // const wsUrl =
    //   import.meta.env.VITE_WS_URL +
    //   `/ws?topic_id=${topicId}&subtopic_id=${subTopicId}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    setStatus('searching');

    socket.onopen = () => {
      console.log('✅ WebSocket connected to matchmaking');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'match-found') {
          const payload = data.data as MatchFoundPayload;
          console.log('🎯 Match found:', payload.roomId);

          // 🧠 Save to state
          setRoomId(payload.roomId);
          setMyIndex(payload.myIndex);
          setStatus('matched');

          // 💾 Save to sessionStorage
          sessionStorage.setItem('battle_my_index', String(payload.myIndex));
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
      setStatus('idle');
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket closed');
      setStatus('idle');
    };
  };

  useEffect(() => {
    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  return {
    status,
    roomId,
    myIndex,
    socket: socketRef.current,
    startMatchmaking,
  };
}
