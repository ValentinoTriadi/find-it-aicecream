'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubTopic, Topic } from '@/constant';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Swords,
  Trophy,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface TopicNodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
  selectedSubtopic: SubTopic | null;
}

export function SubtopicNodePopup({
  isOpen,
  onClose,
  topic,
  selectedSubtopic,
}: TopicNodePopupProps) {
  if (topic == null) return null;
  if (selectedSubtopic == null) return null;

  const navigate = useNavigate();
  const { status, roomId, startMatchmaking } = useMatchmaking(
    topic.id.toString(),
    selectedSubtopic.id?.toString() || topic.id.toString(),
);

  useEffect(() => {
    if (status === 'matched' && roomId) {
      navigate(`/battle/${roomId}/${topic.id}/${selectedSubtopic.id}`);
    }
  }, [status, roomId, navigate]);

  function HandleMatchmaking() {
    startMatchmaking();
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        if (status !== 'searching') {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-white max-w-3xl min-w-xl w-2xl overflow-hidden p-0">
        <div className="bg-dark-blue text-white p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-blue flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-stronger-blue flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedSubtopic.level}
                    </span>
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedSubtopic.name}
                  </DialogTitle>
                  <div className="flex mt-2">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < selectedSubtopic.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <DialogDescription className="text-gray-600 mb-6 gap-2 flex flex-col">
            <div className="flex gap-2 text-stronger-blue items-center">
              <Trophy className="w-4 h-4" />
              <div
                className="text-base
            "
              >
                {selectedSubtopic.points}
              </div>
            </div>
            {selectedSubtopic.description ||
              `Learn essential vocabulary and phrases for ${selectedSubtopic.name.toLowerCase()} situations. Practice conversations and improve your speaking skills.`}
          </DialogDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-primary-blue rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Swords className="w-5 h-5 text-dark-blue" />
                <h3 className="font-bold text-dark-blue">Battle Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Battles Won</span>
                  </div>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Average Time</span>
                  </div>
                  <span className="font-medium">2m 45s</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Best Score</span>
                  </div>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h1 className="text-base font-semibold">Roles</h1>
            <ul className="bg-background rounded-[10px] flex flex-col py-3 gap-1">
              {selectedSubtopic.roles.map((role, index) => (
                <li
                  className="flex flex-row gap-3 items-start px-2"
                  key={index}
                >
                  <div className="h-7 w-7 p-1 flex items-center justify-center bg-stronger-blue rounded-full">
                    <span className=" line-clamp-none text-white text-base">
                      {index + 1}
                    </span>
                  </div>
                  <div className=" flex flex-col">
                    <h2 className="text-dark-blue font-semibold text-base">
                      {role.name}
                    </h2>
                    <h3 className="text-primary-border text-sm">{role.desc}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex gap-3">
              <Link
                to={`/learn/${selectedSubtopic.id}`}
                className="border-stronger-blue text-stronger-blue hover:bg-stronger-blue/10"
              >
                Continue Learning
              </Link>

              <Button
                className="bg-stronger-blue hover:bg-more-stronger-blue text-white"
                onClick={HandleMatchmaking}
                disabled={status === 'searching'}
              >
                {status === 'searching' ? (
                  <>
                    Matching...
                    <span className="ml-2 animate-spin">🔄</span>
                  </>
                ) : (
                  <>
                    Start Battle <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
