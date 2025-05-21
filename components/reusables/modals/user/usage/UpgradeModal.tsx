"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { UserProfileSubscription } from "@/constants/_faker/profile/userSubscription";
import { SubscriptionFeatures } from "@/constants/dashboard/featureList";
import { useModalStore } from "@/lib/stores/dashboard";
import { ArrowUpCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FeatureList = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{SubscriptionFeatures.map((feature) => (
				<div key={feature.title}>
					<div className="mb-2 flex items-center">
						<span className="mr-2 text-blue-500">
							<feature.icon className="h-5 w-5" />
						</span>
						<h4 className="font-medium">{feature.title}</h4>
					</div>
					<p className="text-muted-foreground text-sm">{feature.subtitle}</p>
				</div>
			))}
		</div>
	);
};

interface PlanTier {
	id: string;
	name: string;
	price: number;
	priceSuffix?: string;
	description: string;
	features: string[];
	stripePaymentLink: string;
	cta?: string;
}

interface UpgradeModalProps {
	trial?: boolean;
	plans?: PlanTier[];
	initialPlanId?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
	trial = false,
	plans = [
		{
			id: "pro",
			name: "Pro",
			price: 1795,
			priceSuffix: "/ month",
			description:
				"AI-powered leads made easy. Welcome to the future. Let's upgrade your business.",
			features: [
				"3 call attempts per number",
				"2,400 calls per minute",
				"Intelligent conversations",
				"Smart lead summary",
				"Detailed KPIs & stats",
				"Rapid campaign delivery",
			],
			stripePaymentLink: "https://buy.stripe.com/test_123456789",
			cta: "Confirm subscription and pay now",
		},
		{
			id: "starter",
			name: "Starter",
			price: 495,
			priceSuffix: "/ month",
			description:
				"AI-calling for growing teams. Get started with powerful automation.",
			features: [
				"1 call attempt per number",
				"800 calls per minute",
				"Basic lead summary",
				"Standard KPIs",
			],
			stripePaymentLink: "https://buy.stripe.com/test_starter",
			cta: "Start Starter Plan",
		},
	],
	initialPlanId,
}) => {
	const { isUpgradeModalOpen, closeUpgradeModal } = useModalStore();
	const [selectedPlanId, setSelectedPlanId] = useState(
		initialPlanId || plans[0]?.id,
	);
	const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 ${!isUpgradeModalOpen ? "hidden" : ""}`}
			aria-modal="true"
			role="dialog"
			tabIndex={-1}
		>
			<div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-0 animate-fade-in max-h-[80vh] flex flex-col">
				<div className="flex-1 overflow-y-auto p-8">
					<button
						aria-label="Close"
						className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
						onClick={closeUpgradeModal}
					>
						<X size={22} />
					</button>
					<h2 className="text-lg font-semibold mb-1">
						AI Calling - Upgrade your plan
					</h2>
					<p className="text-2xl font-bold mb-2">{selectedPlan.name}</p>
					<p className="mb-4 text-gray-600">{selectedPlan.description}</p>

					{/* Tier Switcher */}
					{plans.length > 1 && (
						<div className="mb-6 flex gap-2">
							{plans.map((plan) => (
								<button
									key={plan.id}
									className={`rounded-full border px-4 py-1 text-sm font-medium transition-all duration-150 ${selectedPlanId === plan.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
									onClick={() => setSelectedPlanId(plan.id)}
								>
									{plan.name}
								</button>
							))}
						</div>
					)}

					<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 font-semibold">
								<span role="img" aria-label="ai">
									🤖
								</span>{" "}
								Calling powered by artificial intelligence.
							</div>
							<p className="text-gray-500 text-sm">
								Our AI technology allows for natural phrasing and dynamic
								engagements using human-like voice models. Advanced calling
								algorithms ensure optimal results and quality leads.
							</p>
							<div className="flex items-center gap-2 font-semibold mt-4">
								<span role="img" aria-label="growth">
									📈
								</span>{" "}
								Scale rapidly and dominate your market.
							</div>
							<p className="text-gray-500 text-sm">
								Scaling your business used to take years; with Lead Ignite, you
								can scale in months.
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 font-semibold">
								<span role="img" aria-label="human">
									👤
								</span>{" "}
								Human vs Lead Ignite.
							</div>
							<p className="text-gray-500 text-sm">
								It takes a human on a dialer 3 years to do what Lead Ignite can
								do in one day. Let us do the heavy lifting while you focus on
								closing deals.
							</p>
						</div>
					</div>

					<div className="my-6 border-t pt-5">
						<div className="mb-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">
							CREDITS / month
						</div>
						<ul className="mb-6 space-y-2 text-base">
							{selectedPlan.features.map((feature, i) => (
								<li key={i} className="flex items-center gap-2">
									<span className="text-green-600">✔</span>{" "}
									<span>{feature}</span>
								</li>
							))}
						</ul>
						<div className="flex items-center justify-between mb-4">
							<span className="text-3xl font-bold">
								${selectedPlan.price.toLocaleString()}{" "}
								<span className="text-base font-medium text-gray-500">
									{selectedPlan.priceSuffix}
								</span>
							</span>
							<span className="text-xs text-gray-500">
								1 credit = 1 property record
							</span>
						</div>
						<a
							href={selectedPlan.stripePaymentLink}
							target="_blank"
							rel="noopener noreferrer"
							className="block w-full rounded-lg bg-blue-600 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700 transition"
						>
							{selectedPlan.cta || "Upgrade now"}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
