"use client";
import type { ProfileFormValues } from "@/types/zod/userSetup/profile-form-schema";
import type React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { InitialBaseSetupData } from "../../../utils/const/getBasetProfile";
import { BaseSetupAssets } from "./BaseSetupAssets";
import { BaseSetupFields } from "./BaseSetupFields";
import { v4 as uuidv4 } from "uuid";

export interface BaseSetupMainProps {
	loading: boolean;
	initialData?: InitialBaseSetupData;
}

export const BaseSetupMain: React.FC<BaseSetupMainProps> = ({
	loading,
	initialData,
}) => {
	const form = useFormContext<ProfileFormValues>();

	useEffect(() => {
		if (initialData) {
			form.setValue("companyName", initialData.companyName || "");
			form.setValue(
				"companyLogo",
				typeof initialData.companyLogo === "string"
					? undefined
					: initialData.companyLogo,
			);
			form.setValue(
				"outreachEmailAddress",
				initialData.outreachEmailAddress || "",
			);
			form.setValue(
				"leadForwardingNumber",
				initialData.leadForwardingNumber || "",
			);
			form.setValue(
				"companyExplainerVideoUrl",
				initialData.companyExplainerVideoUrl || "",
			);
			// Convert initial assets to AssetItem[]
			form.setValue(
				"companyAssets",
				Array.isArray(initialData.companyAssets)
					? initialData.companyAssets
							.filter((asset) => asset instanceof File)
							.map((file) => ({ id: uuidv4(), file }))
					: [],
			);
		}
	}, [initialData, form]);

	return (
		<form className="space-y-10">
			<section className="space-y-4">
				<h2 className="text-xl font-bold mb-2">Company Information</h2>
				<p className="text-gray-500 text-sm mb-4">
					Enter your company details to get started.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<BaseSetupFields loading={loading} />
				</div>
			</section>

			<div className="border-t border-gray-200 dark:border-gray-700 my-8" />

			<section className="space-y-4">
				<h2 className="text-xl font-bold mb-2">Branding Assets</h2>
				<p className="text-gray-500 text-sm mb-4">
					Upload your logo and company assets. Images should be clear and
					professional.
				</p>
				<BaseSetupAssets loading={loading} />
			</section>

			<div className="border-t border-gray-200 dark:border-gray-700 my-8" />
		</form>
	);
};
