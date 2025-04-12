import EnemyTimerBar from '@/components/battle/EnemyTimeBar';
import MicController from '@/components/battle/MicController';
import PausePopup from '@/components/battle/PausePopup';
import ScriptHint from '@/components/battle/ScriptHint';
import TimerCircle from '@/components/battle/TimerCircle';
import BattlePopup from '@/components/battle/result/BattlePopup';
import { Card } from '@/components/ui/card';
import { useRoundManager } from '@/hooks/useRoundManager';
import { useScriptHintManager } from '@/hooks/useScriptHintManager';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { cn } from '@/lib/utils';
import Button from '@mui/material/Button';
import { Info, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const TOTAL_ROUNDS = 1;
const SCRIPT_HINT_DELAY = 7000;
const MUTE_LIMIT = 4;

const staticTopicMap: Record<string, string> = {
  '1': 'As a waiter, you try to offer some menu',
  '2': 'Booking a Hotel',
  '3': 'Job Interview',
  '4': 'Giving Directions',
};

export default function BattleGame() {
  const { topicId } = useParams<{ topicId: string }>();
  const topicName = staticTopicMap[topicId ?? ''] ?? 'Unknown Topic';

  const [scriptHintVisible, setScriptHintVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playerTranscript, setPlayerTranscript] = useState('');
  const [micStarted, setMicStarted] = useState(false);
  const [micError, setMicError] = useState('');
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showPausePopup, setShowPausePopup] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

  const {
    round,
    currentPlayer,
    playerMuteCount,
    enemyMuteCount,
    setPlayerMuteCount,
    setEnemyMuteCount,
    advanceRound,
    checkGameOver,
    progress,
  } = useRoundManager(TOTAL_ROUNDS, MUTE_LIMIT);

  useScriptHintManager({
    currentPlayer,
    delay: SCRIPT_HINT_DELAY,
    onTrigger: () => {
      if (currentPlayer === 'player') {
        setScriptHintVisible(true);
      }
    },
  });

  const { startListening, stopListening, listening } = useVoiceInput({
    onResult: (text) => {
      setScriptHintVisible(false);

      setMicStarted(false);
      setMicError('');
      setPlayerMuteCount(0);
      setPlayerTranscript(text);
    },

    onError: () => {
      setMicError('❌ Your voice could not be recognized. Please try again.');
      setMicStarted(false);
      setPlayerTranscript('');
      stopListening();
    },
    onSilentTimeout: () => {
      setScriptHintVisible(true);
      if (currentPlayer === 'player') {
        setPlayerMuteCount((prev) => prev + 1);
      } else {
        setEnemyMuteCount((prev) => prev + 1);
      }
      endCurrentRound();
    },
  });

  useEffect(() => {
    if (checkGameOver()) {
      setShowFinalPopup(true);
    }
  }, [round]);

  const endCurrentRound = () => {
    const text = playerTranscript;
    sendMessage({
      type: 'playerTurn',
      data: {
        round,
        player: currentPlayer,
        transcript: text,
      },
    });

    advanceRound();
    setPlayerTranscript('');
    setMicStarted(false);
    stopListening();
  };

  const handleMicClick = () => {
    setScriptHintVisible(false);

    if (!micStarted) {
      setMicStarted(true);
      setPlayerTranscript('');
      startListening();
    } else {
      // Retry: stop current, reset, and restart mic
      stopListening();
      setPlayerTranscript('');
      startListening();
    }
  };

  const handleSubmit = () => {
    endCurrentRound();
  };

  useEffect(() => {
    const socket = new WebSocket(
      import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/1',
    ); // 1 for room_id 1 (static)
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      // Handle incoming messages
      setConversation((prev) => {
        const updatedConversation = [...prev, message];
        console.log('Updated conversation:', updatedConversation); // Logs the correct updated state
        return updatedConversation;
      });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending message:', data);

      try {
        socketRef.current.send(JSON.stringify(data));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-6 gap-20">
      {/* Top Bar */}
      <div className="flex flex-row w-full justify-around gap-5">
        <Button type="button" className="w-fit h-fit text-black">
          <Pause
            className="w-12 h-12 text-black"
            onClick={() => setShowPausePopup(true)}
          />
        </Button>

        <Card className="w-2xl px-6 text-center max-w-3xl min-w-md bg-white text-dark-blue drop-shadow-md">
          <h1 className="text-2xl font-medium">Round {round}</h1>
          <p className="font-semibold text-3xl">{topicName}</p>
        </Card>

        <Button className="w-fit h-fit text-black">
          <Info className="w-12 h-12 text-black" />
        </Button>
      </div>

      {/* Main Battle Section */}
      <div className="flex flex-row w-full gap-5 items-center justify-around">
        {/* Player Side */}
        <div className="flex flex-col items-center gap-4">
          {scriptHintVisible && currentPlayer === 'player' && (
            <ScriptHint message="Can I ask for another menu? I want to change some of the food I ordered." />
          )}
          <img
            className="min-w-xs max-w-sm"
            src="/images/player-1-avatar.png"
          />
        </div>

        {/* Center Timer + Controls */}
        <div className="flex flex-col items-center justify-between gap-6">
          <TimerCircle progress={progress} />
          {currentPlayer === 'player' && (
            <div className="flex flex-col items-center gap-4">
              {!micStarted && (
                <div className="flex flex-col items-center gap-2">
                  {micError && (
                    <div className="text-red-600 text-sm font-medium bg-white px-4 py-2 rounded shadow">
                      {micError}
                    </div>
                  )}
                  <MicController
                    listening={listening}
                    onClick={handleMicClick}
                  />
                </div>
              )}

              {playerTranscript && (
                <>
                  <div className="bg-primary-blue text-dark-blue px-4 py-2 rounded text-sm shadow">
                    You said: <em>{playerTranscript}</em>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="bg-bolder-blue hover:bg-dark-blue text-black font-semibold px-4 py-2 rounded shadow"
                  >
                    Submit Turn
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Enemy Side */}
        <div
          className={cn(
            'flex flex-col h-full justify-between pt-12',
            currentPlayer === 'player' && 'opacity-60',
          )}
        >
          <EnemyTimerBar progress={currentPlayer === 'enemy' ? progress : 0} />
          <img
            className="min-w-xs max-w-sm"
            src="/images/player-2-avatar.png"
          />
        </div>
      </div>
      {showPausePopup && (
        <PausePopup
          topicName={topicName}
          onResume={() => setShowPausePopup(false)}
          onRestart={() => window.location.reload()}
          onExit={() => (window.location.href = '/battle-map')}
        />
      )}

      {showFinalPopup && (
        <BattlePopup
          round={round}
          topicName={topicName}
          onContinue={() => window.location.href = '/battle-map'}
          onRetry={() => window.location.reload()}
        />
      )}
    </div>
  );
}
