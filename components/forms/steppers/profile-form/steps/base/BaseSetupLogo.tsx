import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ProfileFormValues } from "@/types/zod/userSetup/profile-form-schema";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

// * Props only include loading; form state is managed via useFormContext
interface BaseSetupLogoProps {
	loading: boolean;
}

export const BaseSetupLogo: React.FC<BaseSetupLogoProps> = ({ loading }) => {
	const { control, watch, setValue } = useFormContext<ProfileFormValues>();
	const [isReplacingLogo, setIsReplacingLogo] = useState(false);
	const logoFromForm = watch("companyLogo");

	return (
		<FormField
			name="companyLogo"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Company Logo</FormLabel>
					<FormControl>
						{!logoFromForm ? (
							<div className="relative flex flex-col items-center justify-center">
								<p>No logo available</p>
								<input
									type="file"
									accept="image/*"
									disabled={loading}
									onChange={(e) => {
										if (e.target.files?.[0]) {
											const file = e.target.files[0];
											field.onChange(file);
											setIsReplacingLogo(false);
										}
									}}
									className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
								/>
								<button
									type="button"
									disabled={loading}
									className="mt-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
									onClick={() => setIsReplacingLogo(false)}
								>
									Add Logo
								</button>
							</div>
						) : isReplacingLogo ? (
							<div className="relative flex flex-col items-center justify-center">
								<input
									type="file"
									accept="image/*"
									disabled={loading}
									onChange={(e) => {
										if (e.target.files?.[0]) {
											const file = e.target.files[0];
											field.onChange(file);
											setIsReplacingLogo(false);
										}
									}}
									className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
								/>
								<button
									type="button"
									disabled={loading}
									className="mt-2 rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700"
									onClick={() => setIsReplacingLogo(false)}
								>
									Cancel
								</button>
							</div>
						) : (
							<div className="relative flex flex-col items-center justify-center">
								{typeof logoFromForm === "string" && (
									<Image
										src={logoFromForm}
										alt="Company Logo"
										className="mb-4 h-32 w-32 rounded-lg object-cover"
										width={300}
										height={300}
									/>
								)}
								<button
									type="button"
									onClick={() => setIsReplacingLogo(true)}
									className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
								>
									Replace Logo
								</button>
							</div>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
