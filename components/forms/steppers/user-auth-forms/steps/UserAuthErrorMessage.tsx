interface UserAuthErrorMessageProps {
	error: string | null;
}

export const UserAuthErrorMessage: React.FC<UserAuthErrorMessageProps> = ({
	error,
}) => {
	if (!error) return null;
	return (
		<div className="text-red-600 text-sm mb-2" role="alert">
			{error}
		</div>
	);
};
