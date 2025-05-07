import supabase from "@/utils/supabase";

// Ambil semua progress lesson user
export async function fetchUserLearn(userId: string) {
  const { data, error } = await supabase
    .from("user_learn")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
}

// Tandai lesson selesai
export async function markLessonComplete(userId: string, lessonId: number) {
  const { error } = await supabase.from("user_learn").upsert([
    {
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      updated_at: new Date().toISOString(),
    },
  ]);
  if (error) throw new Error(error.message);
}
