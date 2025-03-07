'use client';

import { create } from 'zustand';
import type { User } from '@supabase/auth-helpers-nextjs'; // ✅ Import Supabase User type

interface SessionState {
  user: User | null; // ✅ Holds user context
  setUser: (user: User) => void; // ✅ Allows setting user data
  clearUser: () => void; // ✅ Allows clearing session
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null, // ✅ Initially no user

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null })
}));
