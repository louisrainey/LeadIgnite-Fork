import { toast } from 'sonner';
import { updateUserProfile } from '@/actions/user';
import {
  UserProfile,
  TwoFactorAuth,
  NotificationPreferences
} from '@/types/userProfile';

// 1️⃣ Update Personal Information (UserProfile Table)
export const updatePersonalInfoUtil = async (
  userId: string,
  formData: any,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    console.log(`🔄 Updating personal info for user: ${userId}`);

    // ✅ Extract Two-Factor Authentication Data
    const twoFactorAuth: TwoFactorAuth = {
      methods: {
        sms: formData.twoFactorAuth?.sms ?? false,
        email: formData.twoFactorAuth?.email ?? false,
        authenticatorApp: formData.twoFactorAuth?.authenticatorApp ?? false
      },
      lastUpdatedAt: formData.twoFactorAuth?.isEnabled && new Date()
    };

    console.log('🛠 Two-Factor Auth Data:', twoFactorAuth);

    // ✅ Extract Notification Preferences Data
    const notificationPreferences: NotificationPreferences = {
      emailNotifications: formData.notifications?.emailNotifications ?? false,
      smsNotifications: formData.notifications?.smsNotifications ?? false,
      notifyForNewLeads: formData.notifications?.notifyForNewLeads ?? false,
      notifyForCampaignUpdates:
        formData.notifications?.notifyForCampaignUpdates ?? false
    };

    console.log('🔔 Notification Preferences Data:', notificationPreferences);

    // ✅ Extract General User Profile Data
    const updatedUserProfile: Partial<UserProfile> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      state: formData.state,
      city: formData.city,
      personalNum: formData.personalNum,
      updatedAt: new Date()
    };

    console.log('📌 Updated User Profile Data:', updatedUserProfile);

    // ✅ Call `updateUserProfile` with extracted data
    const response = await updateUserProfile(
      userId,
      updatedUserProfile,
      twoFactorAuth,
      notificationPreferences
    );

    if (response.status === 'error') {
      toast.error(response.message);
      console.error('❌ Error updating profile:', response.message);
      return false;
    }

    toast.success('✅ Personal Information updated successfully!');
    console.log('✅ Profile update successful!');

    return true;
  } catch (error) {
    console.error('🚨 Error updating personal info:', error);
    toast.error('Something went wrong while updating your profile.');
    return false;
  } finally {
    setLoading(false);
  }
};
