import { SubTopic, Topic } from '@/constant';
import { Button } from '@mui/material';
import { Lock, Star } from 'lucide-react';
import { useState } from 'react';

import { SubtopicNodePopup } from './subtopic-node-popup';

interface SubtopicMapProps {
  selectedTopic: Topic;
}

export const SubtopicMap = ({ selectedTopic }: SubtopicMapProps) => {
  const [openedSubtopic, setOpenedSubtopic] = useState<SubTopic | null>(null);
  
  function handleOpenSubtopic(id: number) {
    setOpenedSubtopic(
      selectedTopic.subtopic.find((sb) => sb.id === id) ?? null,
    );
  }

  function handleCloseSubtopic() {
    setOpenedSubtopic(null);
  }

  

  return (
    <>
      <div className="grid grid-cols-5 gap-8 mb-16 justify-items-center">
        {selectedTopic.subtopic.map((topic) => (
          <Button
            key={topic.id}
            className="flex flex-col items-center rounded-xl"
            onClick={
              topic.unlocked
                ? () => handleOpenSubtopic(topic.id)
                : function () {}
            }
          >
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center border-[16px] mb-2  ${topic.unlocked ? 'bg-secondary-blue cursor-pointer border-card' : 'bg-gray-200 cursor-not-allowed border-primary-border'}`}
            >
              {topic.unlocked ? (
                <div className="text-2xl font-bold text-dark-blue">
                  {topic.level}
                </div>
              ) : (
                <Lock className="w-10 h-10 text-gray-400" />
              )}
            </div>

            <div className="text-center">
              <div className="font-medium text-dark-blue">{topic.name}</div>
              {topic.unlocked && (
                <div className="flex justify-center mt-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < topic.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Button>
        ))}
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
