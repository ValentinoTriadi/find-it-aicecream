import supabase from "@/utils/supabase";

// Ambil top N user berdasarkan experience
export async function fetchLeaderboard(top: number = 10) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nama, experience")
    .order("experience", { ascending: false })
    .limit(top);

  if (error) throw new Error(error.message);
  return data;
}

// Ambil data user saat ini
export async function fetchCurrentUser(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nama, experience")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
