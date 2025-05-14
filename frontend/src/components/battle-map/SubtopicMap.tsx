'use client';

import { SubTopic, TopicCategory } from '@/context/battle-map.context';
import { CheckCircle, Clock, Lock, Star, Trophy, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { SubtopicNodePopup } from './subtopic-node-popup';

interface SubtopicMapProps {
  selectedTopic: TopicCategory;
}

export const SubtopicMap = ({ selectedTopic }: SubtopicMapProps) => {
  const [openedSubtopic, setOpenedSubtopic] = useState<SubTopic | null>(null);
  const [animateNode, setAnimateNode] = useState<number | null>(null);
  const [showPathProgress, setShowPathProgress] = useState(false);

  console.log(selectedTopic);
  // Animate path on mount
  useEffect(() => {
    setTimeout(() => setShowPathProgress(true), 500);
  }, []);

  function handleOpenSubtopic(id: number) {
    setAnimateNode(id);
    setTimeout(() => {
      setAnimateNode(null);
      setOpenedSubtopic(
        selectedTopic.subtopic.find((sb) => sb.id === id) ?? null,
      );
    }, 500);
  }

  function handleCloseSubtopic() {
    setOpenedSubtopic(null);
  }

  // Calculate completion percentage for the path
  const completedNodes = selectedTopic.subtopic.filter(
    (node) => node.unlocked && node.stars > 0,
  ).length;
  const totalNodes = selectedTopic.subtopic.length;
  const completionPercentage = (completedNodes / totalNodes) * 100;

  return (
    <>
      <div className="relative mb-16">
        {/* Path visualization */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-blue-200 -translate-y-1/2 rounded-full overflow-hidden">
          <div
            className="h-full bg-more-stronger-blue transition-all duration-1000 ease-out"
            style={{
              width: showPathProgress ? `${completionPercentage}%` : '0%',
            }}
          ></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                left: `${i * 12 + 5}%`,
                top: Math.sin(i * 0.8) * 10,
                opacity: 0.6,
              }}
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-8 justify-items-center relative z-10">
          {selectedTopic.subtopic.map((topic) => (
            <div key={topic.id} className="flex flex-col items-center">
              <button
                className={`
                  relative w-28 h-28 rounded-full flex items-center justify-center border-[16px] mb-2
                  transition-all transform duration-300
                  ${
                    topic.unlocked
                      ? 'cursor-pointer hover:scale-105'
                      : 'cursor-not-allowed'
                  }
                  ${
                    topic.unlocked
                      ? 'bg-blue-300 border-white shadow-lg'
                      : 'bg-gray-200 border-gray-100'
                  }
                  ${
                    animateNode === topic.id
                      ? 'scale-110 ring-4 ring-yellow-300 ring-opacity-70'
                      : ''
                  }
                `}
                onClick={
                  topic.unlocked ? () => handleOpenSubtopic(topic.id) : () => {}
                }
                disabled={!topic.unlocked}
              >
                {topic.unlocked ? (
                  <div className="text-2xl font-bold text-blue-800">
                    {topic.level}
                  </div>
                ) : (
                  <Lock className="w-10 h-10 text-gray-400" />
                )}

                {/* Completion indicator */}
                {topic.unlocked && topic.stars > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Stats indicators */}
                {topic.unlocked && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {topic.battleWon > 0 && (
                      <div className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Trophy className="w-3 h-3 mr-1 text-yellow-300" />
                        {topic.battleWon}
                      </div>
                    )}
                    {topic.points > 0 && (
                      <div className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Zap className="w-3 h-3 mr-1 text-yellow-300" />
                        {topic.points}
                      </div>
                    )}
                  </div>
                )}
              </button>

              <div className="text-center">
                <div className="font-medium text-blue-800">{topic.name}</div>
                {topic.unlocked && (
                  <div className="flex justify-center mt-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < topic.stars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Time indicator */}
                {topic.unlocked && topic.averageTime > 0 && (
                  <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {Math.floor(topic.averageTime / 60)}m{' '}
                    {topic.averageTime % 60}s
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle stats summary */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          <Trophy className="w-5 h-5 text-blue-600 mr-2" />
          Battle Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-700">
                Completed
              </span>
            </div>
            <span className="font-bold text-blue-800">
              {completedNodes}/{totalNodes}
            </span>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="text-sm font-medium text-blue-700">
                Stars Earned
              </span>
            </div>
            <span className="font-bold text-blue-800">
              {selectedTopic.subtopic.reduce(
                (acc, node) => acc + node.stars,
                0,
              )}
              /{totalNodes * 3}
            </span>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-700">
                Battles Won
              </span>
            </div>
            <span className="font-bold text-blue-800">
              {selectedTopic.subtopic.reduce(
                (acc, node) => acc + node.battleWon,
                0,
              )}
            </span>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-blue-700">
                Total XP
              </span>
            </div>
            <span className="font-bold text-blue-800">
              {selectedTopic.subtopic.reduce(
                (acc, node) => acc + node.points,
                0,
              )}
            </span>
          </div>
        </div>
      </div>

      {openedSubtopic && (
        <SubtopicNodePopup
          isOpen={true}
          onClose={handleCloseSubtopic}
          topic={selectedTopic}
          selectedSubtopic={openedSubtopic}
        />
      )}
    </>
  );
};
