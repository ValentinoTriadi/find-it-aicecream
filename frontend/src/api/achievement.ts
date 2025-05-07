import supabase from "@/utils/supabase";

// Fetch all achievements (master)
export async function fetchAllAchievements() {
  const { data, error } = await supabase
    .from("achievement")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// Fetch user achievements (progress)
export async function fetchUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from("user_achievement")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
}
