import Link from 'next/link';
import { cn } from '@/lib/_utils/kanban/utils';
import { buttonVariants } from '@/components/ui/button';

// ✅ Define the expected props type
interface AuthToggleProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
}

export default function AuthToggle({ isSignUp, setIsSignUp }: AuthToggleProps) {
  return (
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
  );
}
