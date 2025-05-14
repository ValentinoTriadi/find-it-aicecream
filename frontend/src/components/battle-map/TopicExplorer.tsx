'use client';

import type { Topic } from '@/constant';
import { TopicCategory } from '@/context/battle-map.context';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Star, Trophy, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const CATEGORY_POSITIONS = [
  { top: '30%', left: '25%' },
  { top: '30%', left: '75%' },
  { top: '60%', left: '30%' },
  { top: '60%', left: '70%' },
];

interface TopicProps {
  availableTopics: TopicCategory[];
  selectedTopic: TopicCategory;
  handleSelectTopic: (categoryId: number) => void;
}

export const TopicExplorer = ({
  availableTopics,
  selectedTopic,
  handleSelectTopic,
}: TopicProps) => {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  // Simulate particles when a topic is selected
  useEffect(() => {
    setShowParticles(true);
    const timer = setTimeout(() => setShowParticles(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedTopic.id]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-xl p-8 mb-8 h-[400px] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          ></div>
        ))}
      </div>

      {/* Connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="25%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeDasharray="5,5"
          className={
            selectedTopic.id === availableTopics[0].id
              ? 'opacity-70'
              : 'opacity-30'
          }
        />
        <line
          x1="75%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeDasharray="5,5"
          className={
            selectedTopic.id === availableTopics[1].id
              ? 'opacity-70'
              : 'opacity-30'
          }
        />
        <line
          x1="30%"
          y1="60%"
          x2="50%"
          y2="50%"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeDasharray="5,5"
          className={
            selectedTopic.id === availableTopics[2].id
              ? 'opacity-70'
              : 'opacity-30'
          }
        />
        <line
          x1="70%"
          y1="60%"
          x2="50%"
          y2="50%"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeDasharray="5,5"
          className={
            selectedTopic.id === availableTopics[3].id
              ? 'opacity-70'
              : 'opacity-30'
          }
        />
      </svg>

      {/* Center decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-100 opacity-50"></div>

      {/* Topic circles */}
      {availableTopics.map((category, index) => {
        const isSelected = category.id === selectedTopic.id;
        const isHovered = category.id === hoveredTopic;
        const position = isSelected
          ? { top: '50%', left: '50%' }
          : CATEGORY_POSITIONS[index];

        return (
          <motion.div
            key={category.id}
            className="absolute cursor-pointer flex flex-col items-center z-10"
            initial={{
              ...CATEGORY_POSITIONS[index],
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              ...position,
              transform: 'translate(-50%, -50%)',
              scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
              zIndex: isSelected ? 10 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => handleSelectTopic(category.id)}
            onMouseEnter={() => setHoveredTopic(category.id)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="flex flex-col items-center">
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 font-semibold mb-3 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Selected
                </motion.span>
              )}

              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md relative
                  ${isSelected ? 'ring-4 ring-blue-300' : ''}
                  ${isHovered && !isSelected ? 'ring-2 ring-blue-200' : ''}
                `}
                style={{ backgroundColor: category.bgColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}

                {/* Stats indicators */}
                {(isSelected || isHovered) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    <div className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-300" />
                      {index + 1}
                    </div>
                  </div>
                )}

                {/* Selection particles */}
                {isSelected && showParticles && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-yellow-400"
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: (Math.random() - 0.5) * 80,
                          y: (Math.random() - 0.5) * 80,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>

              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="mt-2 font-semibold text-center"
                  style={{ color: isSelected ? '#1e40af' : category.color }}
                >
                  {category.name}

                  {/* Topic details on hover/select */}
                  {(isSelected || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-blue-600 mt-1"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span>{index * 2 + 5} battles</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Zap className="w-3 h-3 text-blue-500" />
                        <span>{index * 100 + 200} XP</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}

      {/* Central info panel when a topic is selected */}
      {selectedTopic && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md border border-blue-200 w-64 text-center"
        >
          <h3 className="font-bold text-blue-800 mb-1">
            {selectedTopic.name} Topic
          </h3>

          <div className="flex justify-center gap-3 text-xs">
            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
              <Trophy className="w-3 h-3 mr-1" />5 Levels
            </div>
            <div className="bg-green-100 text-yellow-700 px-2 py-1 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1" />
              15 Stars
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
