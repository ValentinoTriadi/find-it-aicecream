import { fetchUserLearn, markLessonComplete } from '@/api/learn';
import { Quiz } from '@/components/learn/lesson/Quiz';
import { VideoPlayer } from '@/components/learn/lesson/VideoPlayer';
import SimpleLoading from '@/components/loading';
import { useAuth } from '@/context/auth.context';
import { lessons } from '@/utils/data-lesson';
import { Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(
    lessons.find((l) => l.id === Number(id)),
  );
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [challengeStatus, setChallengeStatus] = useState<{
    [id: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  // Fetch lesson progress dari DB
  useEffect(() => {
    if (!user || !lesson) return;
    setLoading(true);
    fetchUserLearn(user.id)
      .then((data) => {
        const found = data.find((row: any) => row.lesson_id === lesson.id);
        setLessonCompleted(!!found?.completed);

        // Jika lesson quiz, inisialisasi challengeStatus dari DB jika ingin (atau kosong)
        if (lesson.lessonType === 'QUIZ') {
          // Inisialisasi semua challenge belum selesai
          const status: { [id: number]: boolean } = {};
          lesson.challenges.forEach((ch) => {
            status[ch.id] = false;
          });
          setChallengeStatus(status);
        }
      })
      .finally(() => setLoading(false));
  }, [user, lesson]);

  if (!lesson)
    return (
      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-neutral-700">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Lesson not found.</p>
          <Button
            className="text-stronger-blue flex gap-2"
            onClick={() => navigate('/learn')}
          >
            <ArrowLeft className="text-stronger-blue" />{' '}
            <span className="text-stronger-blue">Back to Learn</span>
          </Button>
        </div>
      </div>
    );

  // Lesson dianggap selesai jika ada di user_learn dengan completed: true
  const isLessonCompleted = lessonCompleted;

  // Mark challenge selesai (hanya di state, lesson progress tetap di DB)
  const handleMarkChallengeComplete = async (challengeId: number) => {
    setChallengeStatus((prev) => ({
      ...prev,
      [challengeId]: true,
    }));
  };

  // Mark lesson selesai di DB
  const handleMarkLessonComplete = async () => {
    if (!user || !lesson) return;
    await markLessonComplete(user.id, lesson.id);
    setLessonCompleted(true);
  };

  if (loading) {
    return <SimpleLoading />;
  }

  return (
    <>
      {lesson.lessonType === 'QUIZ' ? (
        <Quiz
          lesson={{
            ...lesson,
            challenges: lesson.challenges.map((challenge) => ({
              ...challenge,
              completed: challengeStatus[challenge.id] || false,
            })),
          }}
          isLessonCompleted={isLessonCompleted}
          markChallengeComplete={handleMarkChallengeComplete}
        />
      ) : (
        <VideoPlayer
          lesson={lesson}
          isLessonCompleted={isLessonCompleted}
          markLessonComplete={handleMarkLessonComplete}
        />
      )}
    </>
  );
}
