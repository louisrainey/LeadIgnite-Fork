import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/types/userProfile';

interface UserProfileState {
  userProfile: UserProfile | null;
  error: string | null;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (updatedData: Partial<UserProfile>) => void;
  resetUserProfile: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      userProfile: null,
      error: null,

      setUserProfile: (profile) => {
        set({ userProfile: profile, error: null });
      },

      updateUserProfile: (updatedData) => {
        set((state) => ({
          userProfile: state.userProfile
            ? { ...state.userProfile, ...updatedData }
            : null
        }));
      },

      resetUserProfile: () => {
        set({ userProfile: null });
      }
    }),
    {
      name: 'user-profile-store', // Local storage key
      getStorage: () => localStorage // Can use sessionStorage instead
    }
  )
);
