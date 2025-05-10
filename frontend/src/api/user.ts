import supabase from "@/utils/supabase";

export const getUserExperience = async (userId: string) => {
  console.log("Fetching user experience for user ID:", userId);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user experience:", error);
    throw new Error(error.message);
  }

  console.log("User experience data:", data);

  return data;
};
