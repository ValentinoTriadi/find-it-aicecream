import { Topic } from '@/constant';
import { AnimatePresence, motion } from 'framer-motion';

const CATEGORY_POSITIONS = [
  { top: '30%', left: '25%' },
  { top: '30%', left: '75%' },
  { top: '60%', left: '30%' },
  { top: '60%', left: '70%' },
];

interface TopicProps {
  availableTopics: Topic[];
  selectedTopic: Topic;
  handleSelectTopic: (categoryId: string) => void;
}


export const TopicExplorer = ({
  availableTopics,
  selectedTopic,
  handleSelectTopic,
}: TopicProps) => {
  return (
    <div className="bg-blue-50 rounded-xl p-8 mb-8 h-[400px] relative">
      {availableTopics.map((category, index) => {
        const Icon = category.icon;
        const isSelected = category.id === selectedTopic.id;
        const position = isSelected
          ? { top: '50%', left: '50%' }
          : CATEGORY_POSITIONS[index];

        return (
          <motion.div
            key={category.id}
            className="absolute cursor-pointer flex flex-col items-center"
            initial={{
              ...CATEGORY_POSITIONS[index],
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              ...position,
              transform: 'translate(-50%, -50%)',
              scale: isSelected ? 1.2 : 1,
              zIndex: isSelected ? 10 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => handleSelectTopic(category.id)}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${isSelected ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: category.bgColor }}
            >
              {Icon}
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="mt-2 text-xs font-medium"
                style={{ color: category.color }}
              >
                {category.name}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
