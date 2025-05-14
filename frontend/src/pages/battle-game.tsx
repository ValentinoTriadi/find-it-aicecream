"use client";

import EnemyTimerBar from "@/components/battle/EnemyTimeBar";
import MicController from "@/components/battle/MicController";
import PausePopup from "@/components/battle/PausePopup";
import ScriptHint from "@/components/battle/ScriptHint";
import TimerCircle from "@/components/battle/TimerCircle";
import BattlePopup from "@/components/battle/result/BattlePopup";
import { Card } from "@/components/ui/card";
import { useBattle } from "@/hooks/useBattle";
import { useScriptHintManager } from "@/hooks/useScriptHintManager";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Info, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@mui/material";

const TOTAL_ROUNDS = 10;
const SCRIPT_HINT_DELAY = 7000;
const MUTE_LIMIT = 4;

const staticTopicMap: Record<string, string> = {
  "1": "As a waiter, you try to offer some menu",
  "2": "Booking a Hotel",
  "3": "Job Interview",
  "4": "Giving Directions",
};

export default function BattleGame() {
  const { topicId, subtopicId, roomId } = useParams<{
    roomId: string;
    topicId: string;
    subtopicId: string;
  }>();
  const topicName = staticTopicMap[subtopicId ?? ""] ?? "Unknown Topic";

  const [scriptHintVisible, setScriptHintVisible] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showPausePopup, setShowPausePopup] = useState(false);

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
  } = useBattle({
    totalRounds: TOTAL_ROUNDS,
    muteLimit: MUTE_LIMIT,
    roomId: roomId ?? crypto.randomUUID(),
  });

  useScriptHintManager({
    currentPlayer: isMyTurn() ? "player" : "enemy",
    delay: SCRIPT_HINT_DELAY,
    onTrigger: () => {
      if (isMyTurn()) {
        setScriptHintVisible(true);
      }
    },
  });

  useEffect(() => {
    if (checkGameOver()) setShowFinalPopup(true);
  }, [round]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start p-6 gap-10 bg-gradient-to-b from-sky-50 to-white">
      {/* Top Bar */}
      <div className="flex flex-row w-full justify-around gap-5">
        {/* <Button
          type="button"
          className="w-fit h-fit text-black"
          onClick={() => setShowPausePopup(true)}
        >
          <Pause className="w-12 h-12 text-black" />
        </Button> */}

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-sm"
        >
          <Pause className="h-10 w-10 text-slate-800" />
        </Button>

        <Card className="w-2xl px-6 gap-1 text-center max-w-3xl min-w-md bg-white text-dark-blue drop-shadow-md flex items-center justify-center flex-col">
          <div className="inline-block w-fit px-4 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-3">
            Round 1
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {topicName}
          </h1>
          <p className="text-slate-500 mt-2">
            Practice your conversation skills in this scenario
          </p>
        </Card>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-sm"
        >
          <Info className="h-10 w-10 text-slate-800" />
        </Button>
      </div>

      {/* Main Battle Section */}
      <div className="flex flex-row w-full mb-10 gap-5 items-center justify-around">
        {/* Player Side */}
        <div className="flex flex-col items-center gap-4 h-full justify-end">
          {scriptHintVisible && isMyTurn() && (
            <ScriptHint message="Can I ask for another menu? I want to change some of the food I ordered." />
          )}
          <img
            className="min-w-xs max-w-sm"
            src="/images/player-1-avatar.png"
          />
        </div>

        {/* Center Timer + Controls */}
        <div className="flex flex-col items-center justify-between gap-6">
          {isMyTurn() && <TimerCircle progress={progress} />}
          {isMyTurn() && (
            <div className="flex flex-col items-center gap-4">
              {
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
              }

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

        {/* Enemy Side */}
        <div
          className={cn(
            "flex flex-col pt-12  h-full justify-end",
            isMyTurn() && "opacity-60"
          )}
        >
          {!isMyTurn() && (
            <EnemyTimerBar progress={!isMyTurn() ? progress : 0} />
          )}
          <img
            className="min-w-xs max-w-sm"
            src="/images/player-2-avatar.png"
          />
        </div>
      </div>

      {/* Popups */}
      {showPausePopup && (
        <PausePopup
          topicName={topicName}
          onResume={() => setShowPausePopup(false)}
          onRestart={() => window.location.reload()}
          onExit={() => (window.location.href = "/battle-map")}
        />
      )}

      {showFinalPopup && (
        <BattlePopup
          round={round}
          topicName={topicName}
          onContinue={() => (window.location.href = "/battle-map")}
          onRetry={() => window.location.reload()}
        />
      )}
    </div>
  );
}
