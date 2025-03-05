import { useState } from 'react';
import UserAuthForm from '@/components/forms/user-auth-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthForm({ isSignUp, setIsSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? 'Create an account' : 'Sign In to your account'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignUp
            ? 'Enter your details to sign up'
            : 'Enter your email to sign in'}
        </p>
      </div>

      <UserAuthForm />

      {isSignUp && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Start your free trial today!
          </p>
          <Button>Sign Up for Free Trial</Button>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button
              className="underline hover:text-primary"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            Don’t have an account?{' '}
            <button
              className="underline hover:text-primary"
              onClick={() => setIsSignUp(true)}
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
  );
}
