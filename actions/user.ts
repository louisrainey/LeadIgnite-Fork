'use server';

// utils/server/updateUserProfile.ts
import { NotificationPreferences, TwoFactorAuth } from '@/types/userProfile';
import { createClient } from '@/utils/supabase/server';
import { UserProfile } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid'; // ✅ Import UUID generator

export async function updateUserProfile(
  userId: string,
  updatedData: Partial<UserProfile>,
  twoFactorAuth?: TwoFactorAuth,
  notifications?: Partial<NotificationPreferences>
) {
  if (!userId) {
    return {
      status: 'error',
      message: 'Invalid update request. Missing userId.'
    };
  }

  try {
    const supabase = await createClient();
    let errors: string[] = [];

    // ✅ Update User Profile
    if (Object.keys(updatedData).length > 0) {
      const success = await updateUserProfileData(
        userId,
        updatedData,
        supabase
      );
      if (!success) errors.push(`Failed to update UserProfile.`);
    }

    // ✅ Update Two-Factor Authentication (2FA)
    if (twoFactorAuth) {
      const success = await updateTwoFactorAuth(
        userId,
        twoFactorAuth,
        supabase
      );
      if (!success) errors.push(`Failed to update TwoFactorAuth.`);
    }

    // ✅ Update Notification Preferences
    if (notifications) {
      const success = await updateNotificationPreferences(
        userId,
        notifications,
        supabase
      );
      if (!success) errors.push(`Failed to update NotificationPreferences.`);
    }

    // ✅ Handle Errors or Success
    if (errors.length > 0) {
      return { status: 'error', message: errors.join(', ') };
    }

    revalidatePath('/dashboard/profile');
    return { status: 'success', message: 'Profile updated successfully!' };
  } catch (error) {
    return {
      status: 'error',
      message: `Unexpected error: ${(error as Error).message}`
    };
  }
}

// ✅ Update User Profile Table (Refactored)
async function updateUserProfileData(
  userId: string,
  updatedData: Partial<UserProfile>,
  supabase: any
) {
  const { error } = await supabase
    .from('UserProfile')
    .update(updatedData)
    .eq('user_id', userId);

  if (error) {
    console.error(`🚨 UserProfile Update Failed: ${error.message}`);
    return false;
  }
  return true;
}

// ✅ Update Two-Factor Authentication Table (Refactored)
async function updateTwoFactorAuth(
  userId: string,
  twoFactorAuth: TwoFactorAuth,
  supabase: any
) {
  const id = uuidv4(); // ✅ Generate a new UUID
  const { error } = await supabase.from('TwoFactorAuth').upsert(
    [
      {
        id,
        user_id: userId,
        sms: twoFactorAuth.methods.sms, // ✅ Individual fields
        email: twoFactorAuth.methods.email,
        authenticatorApp: twoFactorAuth.methods.authenticatorApp,
        lastUpdatedAt: twoFactorAuth.lastUpdatedAt ?? null
      }
    ],
    { onConflict: 'user_id' }
  );

  if (error) {
    console.error(`🚨 TwoFactorAuth Update Failed: ${error.message}`);
    return false;
  }
  return true;
}

// ✅ Update Notification Preferences Table (Refactored)
async function updateNotificationPreferences(
  userId: string,
  notifications: Partial<NotificationPreferences>,
  supabase: any
) {
  const id = uuidv4(); // ✅ Generate a new UUID
  const { error } = await supabase.from('NotificationPreferences').upsert(
    [
      {
        id,
        user_id: userId,
        emailNotifications: notifications.emailNotifications ?? false,
        smsNotifications: notifications.smsNotifications ?? false,
        notifyForNewLeads: notifications.notifyForNewLeads ?? false,
        notifyForCampaignUpdates:
          notifications.notifyForCampaignUpdates ?? false
      }
    ],
    { onConflict: 'user_id' }
  );

  if (error) {
    console.error(`🚨 NotificationPreferences Update Failed: ${error.message}`);
    return false;
  }
  return true;
}

export async function getUserPreferences(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('UserPreferences')
    .select('theme, language, timezone, createdAt, updatedAt')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(`🚨 User Preferences Retrieval Failed: ${error.message}`);
    return null;
  }

  return data;
}

export async function getTwoFactorAuth(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('TwoFactorAuth')
    .select('sms, email, authenticatorApp, lastUpdatedAt')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(
      `🚨 Two-Factor Authentication Retrieval Failed: ${error.message}`
    );
    return null;
  }

  return {
    methods: {
      sms: data.sms ?? false,
      email: data.email ?? false,
      authenticatorApp: data.authenticatorApp ?? false
    },
    lastUpdatedAt: data.lastUpdatedAt ?? null
  };
}

// ✅ Retrieve Notification Settings
export async function getNotificationPreferences(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('NotificationPreferences')
    .select(
      'emailNotifications, smsNotifications, notifyForNewLeads, notifyForCampaignUpdates'
    ) // ✅ Fixed: No trailing comma
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(
      `🚨 Notification Preferences Retrieval Failed: ${error.message}`
    );
    return null;
  }

  return {
    emailNotifications: data.emailNotifications ?? false,
    smsNotifications: data.smsNotifications ?? false,
    notifyForNewLeads: data.notifyForNewLeads ?? false,
    notifyForCampaignUpdates: data.notifyForCampaignUpdates ?? false
  };
}
