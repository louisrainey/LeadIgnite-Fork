"use client";

import type React from "react";
import { useMemo, useState } from "react";
import type {
	Property,
	RealtorProperty,
	RentCastProperty,
} from "@/types/_dashboard/property";
import {
	isRealtorProperty,
	isRentCastProperty,
} from "@/types/_dashboard/property";

interface PropertyCardProps {
	property: Property;
}

// Helper to safely access nested property values, useful for fields not strictly typed.
const getNestedValue = <T = unknown>(
	obj: unknown,
	path: string | string[],
	fallback: T | null = null,
): T | null => {
	if (!obj || typeof obj !== "object") return fallback;

	const pathArray = Array.isArray(path) ? path : path.split(".");
	let result: unknown = obj;

	for (const key of pathArray) {
		if (result === null || result === undefined || typeof result !== "object") {
			return fallback;
		}
		result = (result as Record<string, unknown>)[key];
	}

	return (result as T) ?? fallback;
};

const PropertyCardDataComponent: React.FC<PropertyCardProps> = ({
	property,
}) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [activePhoto, setActivePhoto] = useState<string | null>(null);

	// Centralized and type-safe logic for handling photos
	const { primaryPhotoUrl, otherPhotoUrls } = useMemo<{
		primaryPhotoUrl: string | null;
		otherPhotoUrls: string[];
	}>(() => {
		let primaryUrl: string | null = null;
		let allUrls: string[] = [];

		if (isRealtorProperty(property)) {
			const images = property.media?.images ?? [];
			const primaryImage = images.find((img) => img.isPrimary);
			primaryUrl = primaryImage?.url ?? images[0]?.url ?? null;
			allUrls = images.map((img) => img.url);
		} else if (isRentCastProperty(property)) {
			// Note: RentCastProperty type does not officially include images.
			// This safely attempts to retrieve them from metadata if the API provides them.
			const images = getNestedValue<string[]>(property.metadata, "images", []);
			primaryUrl =
				getNestedValue<string>(property.metadata, "primaryPhoto") ??
				images?.[0] ??
				null;
			allUrls = images ?? [];
		}

		const otherUrls = allUrls.filter((url) => url && url !== primaryUrl);
		return { primaryPhotoUrl: primaryUrl, otherPhotoUrls: otherUrls };
	}, [property]);

	// --- Helper Functions ---

	// Helper for consistently formatting numbers
	const formatNumber = (value: number | null | undefined): string => {
		if (value === null || value === undefined) return "-";
		return value.toLocaleString();
	};

	// Helper for consistently formatting currency
	const formatCurrency = (value: number | null | undefined): string => {
		if (value === null || value === undefined) return "-";
		return `$${value.toLocaleString()}`;
	};

	// Helper for consistently formatting square feet
	const formatSqft = (value: number | null | undefined): string => {
		if (value === null || value === undefined) return "-";
		return `${value.toLocaleString()} sq ft`;
	};

	// Function to render a property detail item
	const renderPropertyDetails = (
		label: string,
		value: string | number | null | undefined,
		highlight = false,
	) => {
		const displayValue =
			value !== null && value !== undefined && value !== "" ? value : "-";
		return (
			<div key={label} className="mb-4 flex flex-col items-start">
				<span className="font-semibold text-gray-500 dark:text-gray-400">
					{label}
				</span>
				<span
					className={`break-words ${highlight ? "font-medium text-blue-600 dark:text-blue-400" : ""}`}
				>
					{displayValue}
				</span>
			</div>
		);
	};

	// --- Derived Properties for Rendering ---

	// Get assessed value for RentCast properties from the latest tax year available
	const assessedValue = isRentCastProperty(property)
		? (() => {
				const assessments = property.metadata.taxAssessments;
				if (!assessments || Object.keys(assessments).length === 0) return null;
				const latestYear = Math.max(...Object.keys(assessments).map(Number));
				return assessments[latestYear]?.value ?? null;
			})()
		: null;

	const hoaFee = isRealtorProperty(property)
		? property.metadata.hoaFee
		: isRentCastProperty(property)
			? property.metadata.hoa?.fee
			: null;

	const lastSoldDate = isRealtorProperty(property)
		? property.metadata.lastSoldDate
		: isRentCastProperty(property)
			? property.metadata.lastSaleDate
			: null;

	const soldPrice = isRentCastProperty(property)
		? property.metadata.lastSalePrice
		: null; // Not available on RealtorProperty type

	const description = isRealtorProperty(property)
		? property.description
		: getNestedValue<string>(property.metadata, "text"); // Fallback for RentCast

	return (
		<div className="roundedte my-2 p-6 font-bold shadow-md dark:bg-gray-800 dark:shadow-lg">
			<h2 className="mb-4 font-bold text-xl dark:text-white">
				Property Information
			</h2>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{/* Agent Information */}
				{isRealtorProperty(property) && (
					<div className="mb-4 flex flex-col items-start">
						<span className="font-semibold text-gray-500 dark:text-gray-400">
							Agent
						</span>
						<span>{property.metadata.agent.name || "-"}</span>
						{property.metadata.agent.email && (
							<a
								href={`mailto:${property.metadata.agent.email}`}
								className="break-all text-blue-600 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								{property.metadata.agent.email}
							</a>
						)}
						{property.metadata.agent.phones?.[0]?.number && (
							<a
								href={`tel:${property.metadata.agent.phones[0].number.replace(/[^\d+]/g, "")}`}
								className="text-blue-600"
							>
								{property.metadata.agent.phones[0].number}
								{property.metadata.agent.phones[0].type &&
									` (${property.metadata.agent.phones[0].type})`}
							</a>
						)}
					</div>
				)}

				{/* Photo Gallery */}
				<div className="mb-4 flex flex-col items-start">
					<span className="font-semibold text-gray-500 dark:text-gray-400">
						Photos
					</span>
					{primaryPhotoUrl ? (
						<div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
							<img
								alt="Primary property"
								className="h-full w-full object-cover"
								height={400}
								src={primaryPhotoUrl}
								width={600}
							/>
						</div>
					) : (
						<div className="mt-2 flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
							<span className="text-gray-500 dark:text-gray-400">
								No image available
							</span>
						</div>
					)}
					{otherPhotoUrls.length > 0 && (
						<div className="mt-2 flex max-w-full space-x-2 overflow-x-auto">
							{otherPhotoUrls.slice(0, 4).map((url, idx) => (
								<button
									key={url}
									type="button"
									className="focus:outline-none"
									onClick={() => {
										setActivePhoto(url);
										setLightboxOpen(true);
									}}
								>
									<img
										src={url}
										alt={`Property thumbnail ${idx + 1}`}
										className="h-16 w-24 rounded border object-cover transition-transform hover:scale-105"
										loading="lazy"
									/>
								</button>
							))}
							{otherPhotoUrls.length > 4 && (
								<span className="self-center text-gray-400 text-xs">
									+{otherPhotoUrls.length - 4} more
								</span>
							)}
						</div>
					)}
				</div>

				{/* Lightbox modal */}
				{lightboxOpen && activePhoto && (
					<dialog
						open
						className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
						onClick={() => setLightboxOpen(false)}
						onKeyDown={(e) => e.key === "Escape" && setLightboxOpen(false)}
					>
						<div
							className="relative"
							role="presentation"
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => e.stopPropagation()}
						>
							<img
								src={activePhoto}
								alt="Full property view"
								className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
							/>
							<button
								type="button"
								onClick={() => setLightboxOpen(false)}
								className="-top-2 -right-2 absolute rounded-full bg-white p-2 text-black shadow-lg"
								aria-label="Close"
							>
								✕
							</button>
						</div>
					</dialog>
				)}

				{/* Property Details */}
				{isRentCastProperty(property) &&
					renderPropertyDetails(
						"Assessed Value",
						formatCurrency(assessedValue),
					)}
				{renderPropertyDetails("Bedrooms", formatNumber(property.details.beds))}
				{renderPropertyDetails(
					"Full Bathrooms",
					formatNumber(property.details.fullBaths),
				)}
				{renderPropertyDetails(
					"Partial Bathrooms",
					formatNumber(property.details.halfBaths),
				)}
				{renderPropertyDetails(
					"Living Area",
					formatSqft(property.details.sqft),
				)}
				{renderPropertyDetails(
					"Lot Size",
					formatSqft(property.details.lotSqft),
				)}
				{renderPropertyDetails(
					"Year Built",
					formatNumber(property.details.yearBuilt),
				)}
				{renderPropertyDetails(
					"Stories",
					formatNumber(property.details.stories),
				)}
				{renderPropertyDetails("Style", property.details.style)}
				{renderPropertyDetails("Property Type", property.details.propertyType)}

				{/* Address Details */}
				{renderPropertyDetails("Full Address", property.address.fullStreetLine)}
				{renderPropertyDetails("City", property.address.city)}
				{renderPropertyDetails("State", property.address.state)}
				{renderPropertyDetails("Zip Code", property.address.zipCode)}
				{renderPropertyDetails("Latitude", property.address.latitude)}
				{renderPropertyDetails("Longitude", property.address.longitude)}

				{/* Listing / Sale Details */}
				{renderPropertyDetails("HOA Fee", formatCurrency(hoaFee))}
				{renderPropertyDetails("Last Sold Date", lastSoldDate)}
				{renderPropertyDetails("Last Sold Price", formatCurrency(soldPrice))}

				{/* Realtor-Specific Details */}
				{isRealtorProperty(property) && (
					<>
						{renderPropertyDetails("Status", property.metadata.status, true)}
						{renderPropertyDetails(
							"List Price",
							formatCurrency(property.metadata.listPrice),
							true,
						)}
						{renderPropertyDetails(
							"Price Per SqFt",
							formatCurrency(property.metadata.pricePerSqft),
						)}
						{renderPropertyDetails(
							"Days on Market",
							formatNumber(property.metadata.daysOnMarket),
						)}
						{renderPropertyDetails("List Date", property.metadata.listDate)}
						{renderPropertyDetails("MLS ID", property.metadata.mlsId)}
						{renderPropertyDetails("Broker", property.metadata.agent.broker)}
					</>
				)}

				{/* Description */}
				{description && (
					<div className="col-span-1 mb-4 flex flex-col items-start sm:col-span-2 lg:col-span-4">
						<span className="font-semibold text-gray-500 dark:text-gray-400">
							Description
						</span>
						<p className="mt-1 whitespace-pre-line break-words">
							{description}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PropertyCardDataComponent;
