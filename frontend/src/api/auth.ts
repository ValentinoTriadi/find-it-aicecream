import supabase from "@/utils/supabase";

import { LoginBody, RegisterBody } from "./schema";

export async function signUpNewUser({ email, password, name }: RegisterBody) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        nama: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // Update user profile name
  const res = await supabase
    .from("users")
    .update({ nama: name })
    .eq("id", data.user?.id);

  if (res.error) {
    console.log("Update profile error:", res.error);
    throw new Error(res.error.message);
  }

  console.log("User signed up:", data);
  return data;
}

export async function signInWithEmail({ email, password }: LoginBody) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log("User signed in:", data);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  console.log("User signed out");
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  console.log("User data:", data);
  return data;
}
