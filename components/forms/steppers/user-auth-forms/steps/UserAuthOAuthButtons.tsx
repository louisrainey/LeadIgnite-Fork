import { LinkedInLoginButton } from "react-social-login-buttons";

export const UserAuthOAuthButtons: React.FC = () => (
	<div className="flex flex-col gap-2 my-4">
		<LinkedInLoginButton
			onClick={() => {
				/* todo: implement OAuth logic */
			}}
		/>
		{/* Add other OAuth providers here */}
	</div>
);
