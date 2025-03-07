'user server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { headers } from 'next/headers';

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  // ✅ Explicitly cast email and password as strings and handle null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

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
