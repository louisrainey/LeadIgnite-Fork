import { useState } from "react";
import type { UserProfileSubscription } from "@/constants/_faker/profile/userSubscription";
import SubscriptionDetailsStep from "./SubscriptionDetailsStep";
import { Button } from "@/components/ui/button";

interface ManageSubscriptionModalProps {
	subscription: UserProfileSubscription;
}

const ManageSubscriptionModal = ({
	subscription,
}: ManageSubscriptionModalProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubscriptionActive, setIsSubscriptionActive] = useState(
		subscription.status === "active",
	);
	const [subscriptionType, setSubscriptionType] = useState<
		"monthly" | "yearly"
	>(subscription.type);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const switchToYearly = () => setSubscriptionType("yearly");
	const cancelSubscription = () => {
		setIsSubscriptionActive(false);
		setSubscriptionType("monthly");
	};

	return (
		<>
			<Button
				onClick={openModal}
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto"
				type="button"
			>
				Manage Subscription
			</Button>
			<SubscriptionDetailsStep
				isOpen={isOpen}
				onClose={closeModal}
				subscription={subscription}
				isSubscriptionActive={isSubscriptionActive}
				subscriptionType={subscriptionType}
				onSwitchToYearly={switchToYearly}
				onCancel={cancelSubscription}
			/>
		</>
	);
};

export default ManageSubscriptionModal;
