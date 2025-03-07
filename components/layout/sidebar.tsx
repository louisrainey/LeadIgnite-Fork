'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/_utils/kanban/utils';
import { ChevronLeft, FlameIcon } from 'lucide-react';
import Link from 'next/link';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { useNavbarStore } from '@/lib/stores/dashboard/navbarStore';
import { createClient } from '@/utils/supabase/server';
import { useSessionStore } from '@/lib/stores/user/useSessionStore';
import { User } from '@supabase/auth-helpers-nextjs';

export default function SidebarClient({ user }: { user: User | null }) {
  const { isSidebarMinimized, toggleSidebar } = useNavbarStore();
  const { setUser } = useSessionStore(); // ✅ Zustand state

  useEffect(() => {
    if (user) {
      setUser(user); // ✅ Set Zustand state on mount
    }
  }, [user, setUser]);

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        isSidebarMinimized ? 'w-[72px]' : 'w-72'
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href="https://www.cybershoptech.com" target="_blank">
          <FlameIcon className="mr-2 h-8 w-8" />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isSidebarMinimized && 'rotate-180'
        )}
        onClick={toggleSidebar}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>

      {/* ✅ Display user info, either from the server or client */}
      {user && !isSidebarMinimized && (
        <div className="p-4 text-sm text-foreground">
          Logged in as: <strong>{user.email}</strong>
        </div>
      )}
    </aside>
  );
}
