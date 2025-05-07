import { useEffect, useState } from "react";
import { Unit } from "@/components/learn/LearnUnit";
import { learnUnits as initialLearnUnits } from "@/utils/data-learn";
import { fetchUserLearn } from "@/api/learn";
import { useAuth } from "@/context/auth.context";

export default function LearnPage() {
  const { user } = useAuth();
  const [learnUnits, setLearnUnits] = useState(initialLearnUnits);
  const [userLearnProgress, setUserLearnProgress] = useState<
    { lessonId: number; completed: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchUserLearn(user.id)
      .then((data) => {
        // Mapping ke format yang dibutuhkan Unit
        const progress = data.map((row: any) => ({
          lessonId: row.lesson_id,
          completed: row.completed,
        }));
        setUserLearnProgress(progress);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading your progress...</div>;
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        {learnUnits.map((unit) => (
          <div key={unit.id} className="mb-8">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              userLearnProgress={userLearnProgress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
