'use client';

import { useState, useEffect } from 'react'; // useState to toggle between Sign In/Sign Up
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/kanban/utils';
import { FlameIcon } from 'lucide-react';
import { useKanbanStore } from '@/lib/stores/user/login';

export default function AuthenticationPage() {
  // Step 1: State to toggle between Sign In and Sign Up views
  const [isSignUp, setIsSignUp] = useState(false);

  // Access state and actions from the Kanban store
  const { quotes, currentQuoteIndex, nextQuote } = useKanbanStore();

  // Use effect to switch quotes every 5 seconds
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
        {isSignUp
          ? 'Already have an account? Sign In'
          : 'Need an account? Sign Up'}
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
            {/* Step 2: Conditionally render header based on isSignUp */}
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp ? 'Create an account' : 'Sign In to your account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? 'Enter your details to sign up'
                : 'Enter your email to sign in'}
            </p>
          </div>

          {/* Authentication Form */}
          <UserAuthForm />

          {/* Additional content for Sign Up */}
          {isSignUp && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Start your free trial today!
              </p>
              <button>Sign Up for Free Trial</button>
            </div>
          )}

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  className="underline hover:text-primary"
                  onClick={() => setIsSignUp(false)} // Switch to Sign In
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don`t have an account?{' '}
                <button
                  className="underline hover:text-primary"
                  onClick={() => setIsSignUp(true)} // Switch to Sign Up
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>

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
