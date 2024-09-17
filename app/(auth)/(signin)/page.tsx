'use client';

import Link from 'next/link';
import { useEffect } from 'react'; // Remove useState, we use Zustand now
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/kanban/utils';
import { FlameIcon } from 'lucide-react';
import { useKanbanStore } from '@/lib/stores/user/login';

export default function AuthenticationPage() {
  // Step 1: Access state and actions from the Kanban store
  const { quotes, currentQuoteIndex, nextQuote } = useKanbanStore();

  // Step 2: Use effect to switch quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextQuote(); // Call the store's nextQuote action
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [nextQuote]);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <FlameIcon className="mr-2 h-6 w-6" />
          Lead Ignite
        </div>
        <div className="relative z-20 mt-auto">
          {/* Step 3: Display the current quote */}
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;{quotes[currentQuoteIndex].text}&rdquo;
            </p>
            <footer className="text-sm">
              {quotes[currentQuoteIndex].author}
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
