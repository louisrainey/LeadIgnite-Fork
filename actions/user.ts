'use server';

import { createClient } from '@/utils/supabase/server';
import { UserProfile } from '@prisma/client';
import { revalidatePath } from 'next/cache';

/** ✅ Update User Profile */
export async function updateUserProfile(
  userId: string,
  updatedData: Partial<UserProfile>
) {
  if (!userId || Object.keys(updatedData).length === 0) {
    return { status: 'error', message: 'Invalid update request.' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('UserProfile')
    .update(updatedData)
    .eq('user_id', userId);

  if (error) {
    return {
      status: 'error',
      message: `Failed to update profile: ${error.message}`
    };
  }

  revalidatePath('/dashboard/profile');
  return { status: 'success', message: 'Profile updated successfully!' };
}
