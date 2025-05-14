"use client";

import type { User } from "@supabase/auth-helpers-nextjs"; // ✅ Import Supabase User type
import { create } from "zustand";

interface SessionState {
	user: User | null; // ✅ Holds user context
	setSessionUser: (user: User) => void; // ✅ Allows setting user data
	clearUser: () => void; // ✅ Allows clearing session
}

export const useSessionStore = create<SessionState>((set) => ({
	user: null, // ✅ Initially no user

	setSessionUser: (user) => set({ user }),

	clearUser: () => set({ user: null }),
}));
