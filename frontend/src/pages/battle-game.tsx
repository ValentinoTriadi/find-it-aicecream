'use client';

import EnemyTimerBar from '@/components/battle/EnemyTimeBar';
import MicController from '@/components/battle/MicController';
import PausePopup from '@/components/battle/PausePopup';
import ScriptHint from '@/components/battle/ScriptHint';
import TimerCircle from '@/components/battle/TimerCircle';
import BattlePopup from '@/components/battle/result/BattlePopup';
import { Card } from '@/components/ui/card';
import { useBattle } from '@/hooks/useBattle';
import { useScriptHintManager } from '@/hooks/useScriptHintManager';
import { cn } from '@/lib/utils';
import { objectivesMap, rolesMap } from '@/utils/objectives';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Info, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SCRIPT_HINT_DELAY = 7000;
const MUTE_LIMIT = 4;

const staticTopicMap: Record<string, string> = {
  '1': 'As a waiter, you try to offer some menu',
  '2': 'Booking a Hotel',
  '3': 'Job Interview',
  '4': 'Giving Directions',
};

export default function BattleGame() {
  const { topicId, subtopicId, roomId } = useParams<{
    roomId: string;
    topicId: string;
    subtopicId: string;
  }>();

  const topicName = staticTopicMap[subtopicId ?? '1'] ?? 'Unknown Topic';
  const currentObjectives = normalizeObjectives(objectivesMap[subtopicId ?? '1'] ?? [])
  const currentRoles = rolesMap[subtopicId ?? '1'] ?? { user1: 'waiter', user2: 'customer' };

  const [scriptHintVisible, setScriptHintVisible] = useState<string | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showPausePopup, setShowPausePopup] = useState(false);

  const [score, setScore] = useState<any | null>(null);
  const [feedback, setFeedback] = useState<any | null>(null);
  const [objectives, setObjectives] = useState<any | null>(null);


  function normalizeObjectives(
    raw: string[] | { user1: string[]; user2: string[] }
  ): { user1: string[]; user2: string[] } {
    if ('user1' in raw && 'user2' in raw) {
      return raw;
    }
  
    return {
      user1: raw,
      user2: raw,
    };
  }




  const {
    round,
    isMyTurn,
    progress,
    micStarted,
    micError,
    listening,
    transcript,
    setMicStarted,
    handleMicClick,
    handleSubmit,
    checkGameOver,
    conversation,
    myIndex,
    completeObjective,
  } = useBattle({
    topic: topicName, 
    muteLimit: MUTE_LIMIT,
    roomId: roomId ?? crypto.randomUUID(),
    objectives: currentObjectives,
  });
  

  useScriptHintManager({
    currentPlayer: isMyTurn() ? 'player' : 'enemy',
    delay: SCRIPT_HINT_DELAY,
    conversation,
    onTrigger: (hint: string) => {
      if (isMyTurn()) setScriptHintVisible(hint);
    },
  });

  

  useEffect(() => {
    if (!checkGameOver()) return;

    const fetchResults = async () => {
      const conversationText = conversation
        .map((msg) => `${msg.player === myIndex ? 'user1' : 'user2'}: ${msg.transcript}`)
        .join('\n');

      try {
        const [feedbackRes, scoreRes, objRes] = await Promise.all([
          axios.post('/api/ai/feedback', { conversation: conversationText }),
          axios.post('/api/ai/score', { conversation: conversationText }),
          axios.post('/api/ai/objectives', {
            topic: topicName,
            conversation: conversationText,
            role: currentRoles,
            objective: currentObjectives,
          }),
        ]);

        setFeedback(feedbackRes.data.feedback);
        setScore(scoreRes.data.score);
        setObjectives(objRes.data.objectives);
        setShowFinalPopup(true);
      } catch (err) {
        console.error('❌ Failed to fetch results from AI:', err);
      }
    };

    fetchResults();
  }, [checkGameOver()]);
  
  const myKey = (myIndex === 0 ? 'user1' : 'user2') as 'user1' | 'user2';
  const allObjectives = currentObjectives[myKey] ?? [];
  const currentObjectiveIndex = round - 1;
  const currentObjective = allObjectives[currentObjectiveIndex] || '🎉 All objectives completed';


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-6 gap-20">
      {/* Top Bar */}
      <div className="flex flex-row w-full justify-around gap-5">
        <Button onClick={() => setShowPausePopup(true)} className="w-fit h-fit text-black">
          <Pause className="w-12 h-12 text-black" />
        </Button>

        <Card className="w-2xl px-6 text-center max-w-3xl min-w-md bg-white text-dark-blue drop-shadow-md">
          <h1 className="text-2xl font-medium">Round {round}</h1>
          <p className="font-semibold text-xl text-primary-blue">🎯 {currentObjective}</p>
        </Card>

        <Button className="w-fit h-fit text-black">
          <Info className="w-12 h-12 text-black" />
        </Button>
      </div>

      {/* Main Section */}
      <div className="flex flex-row w-full gap-5 items-center justify-around">
        <div className="flex flex-col items-center gap-4">
          {scriptHintVisible && isMyTurn() && (
            <ScriptHint message={scriptHintVisible} />
          )}
          <img className="min-w-xs max-w-sm" src="/images/player-1-avatar.png" />
        </div>

        <div className="flex flex-col items-center justify-between gap-6">
          {isMyTurn() && <TimerCircle progress={progress} />}
          {isMyTurn() && (
            <div className="flex flex-col items-center gap-4">
              {!micStarted && (
                <div className="flex flex-col items-center gap-2">
                  {micError && (
                    <div className="text-red-600 text-sm font-medium bg-white px-4 py-2 rounded shadow">
                      {micError}
                    </div>
                  )}
                  <MicController listening={listening} onClick={handleMicClick} />
                </div>
              )}
              {transcript && (
                <>
                  <div className="bg-primary-blue text-dark-blue px-4 py-2 rounded text-sm shadow">
                    You said: <em>{transcript}</em>
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

        <div className={cn('flex flex-col h-full justify-between pt-12', isMyTurn() && 'opacity-60')}>
          <EnemyTimerBar progress={!isMyTurn() ? progress : 0} />
          <img className="min-w-xs max-w-sm" src="/images/player-2-avatar.png" />
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

      {showFinalPopup && score && feedback && objectives && (
        <BattlePopup
          topicName={topicName}
          conversation={conversation}
          score={score}
          feedback={feedback}
          objectives={objectives}
          onContinue={() => (window.location.href = '/battle-map')}
          onRetry={() => window.location.reload()}
        />
      )}
    </div>
  );
}
