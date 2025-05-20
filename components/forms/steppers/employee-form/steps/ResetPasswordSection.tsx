import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface ResetPasswordSectionProps {
	userId: string;
	userEmail: string;
}

export const ResetPasswordSection: React.FC<ResetPasswordSectionProps> = ({
	userId,
	userEmail,
}) => {
	const [loading, setLoading] = useState(false);

	const handleReset = async () => {
		setLoading(true);
		try {
			// TODO: Replace with your API call
			// await api.resetUserPassword(userId);
			await new Promise((res) => setTimeout(res, 1000)); // mock
			toast({
				title: "Reset email sent!",
				description: `A password reset email was sent to ${userEmail}.`,
				variant: "default",
			});
		} catch (e) {
			toast({
				title: "Error",
				description: "Failed to send reset email. Please try again.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="mt-8 border bg-muted p-6 shadow-none">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold text-lg">Reset Password</h3>
					<p className="text-muted-foreground text-sm">
						Send a password reset email to this team member. They will receive a
						link to set a new password.
					</p>
				</div>
				<Button onClick={handleReset} disabled={loading} variant="secondary">
					{loading ? "Sending..." : "Send Reset Email"}
				</Button>
			</div>
			<Separator className="my-4" />
			<p className="text-muted-foreground text-xs">
				This will not reveal the current password or set a new one directly. Use
				only if the team member cannot log in.
			</p>
		</Card>
	);
};
