import supabase from '@/utils/supabase';

import { LoginBody, RegisterBody } from './schema';

export async function signUpNewUser({ email, password, name }: RegisterBody) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log('User signed up:', data);
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

  console.log('User signed in:', data);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  console.log('User signed out');
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  console.log('User data:', data);
  return data;
}
