import { useRef, useState } from 'react';

type MatchmakingState = 'idle' | 'searching' | 'matched';

interface MatchFoundPayload {
  roomId: string;
}

export function useMatchmaking(topicId: string, subTopicId: string) {
  const [status, setStatus] = useState<MatchmakingState>('idle');
  const [roomId, setRoomId] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const startMatchmaking = () => {
    console.log('Starting matchmaking...');

    const wsUrl = `ws://localhost:8000/ws?topic_id=${topicId}&subtopic_id=${subTopicId}`;
    const socket = new WebSocket(wsUrl);

    socketRef.current = socket;
    setStatus('searching');

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'match-found') {
          const payload = data.data as MatchFoundPayload;
          console.log('🎯 Match found:', payload.roomId);
          setRoomId(payload.roomId);
          setStatus('matched');
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
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

  return {
    status,
    roomId,
    socket: socketRef.current,
    startMatchmaking,
  };
}
