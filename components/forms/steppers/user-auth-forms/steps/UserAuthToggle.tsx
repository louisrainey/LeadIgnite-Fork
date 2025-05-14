interface UserAuthToggleProps {
	isSignUp: boolean;
	setIsSignUp: (val: boolean) => void;
	loading: boolean;
}

export const UserAuthToggle: React.FC<UserAuthToggleProps> = ({
	isSignUp,
	setIsSignUp,
	loading,
}) => (
	<button
		type="button"
		className="text-blue-600 underline text-sm mb-4"
		disabled={loading}
		onClick={() => setIsSignUp(!isSignUp)}
	>
		{isSignUp
			? "Already have an account? Sign In"
			: "Don't have an account? Sign Up"}
	</button>
);
