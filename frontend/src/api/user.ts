import supabase from "@/utils/supabase";

export const getUserXP = async (userId?: string) => {
  if (!userId) {
    return 0;
  }

  console.log("getUserXP", userId);

  const { data, error } = await supabase.from("users").select();
  // .eq("id", userId);

  console.log("getUserXP data", data);

  if (error) {
    throw new Error(error.message);
  }

  return (data?.[0].experience ?? 0) as number;
};
