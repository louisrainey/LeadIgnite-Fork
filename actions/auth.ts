'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  // ✅ Explicitly cast email and password as strings and handle null
  let credentials = {
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? ''
  };
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: formData.get('username') as string | undefined // ✅ Handle username safely
      }
    }
  });

  if (error) {
    return {
      status: error?.message,
      user: null
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: 'User with this email already exists',
      user: null
    };
  }

  revalidatePath('/', 'layout');
  return { status: 'success', user: data.user };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  let credentials = {
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? ''
  };
  const { email, password } = credentials;

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      status: error?.message,
      user: null
    };
  }

  const { data: existingUser } = await supabase
    .from('UserProfile')
    .select('*')
    .eq('email', credentials?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase
      .from('UserProfile')
      .insert({
        user_id: data?.user.id,
        email: data?.user.email,
        username: data?.user.user_metadata.username
      });
    if (insertError) {
      return {
        status: insertError.message,
        user: null
      };
    }
  }
  revalidatePath('/', 'layout');
  return { status: 'success', user: data.user };

  // TODO: create a user instance of in user profiles table
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/login');
}
