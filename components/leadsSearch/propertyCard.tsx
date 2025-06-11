import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/types/_dashboard/property";
import { isRealtorProperty } from "@/types/_dashboard/property";
import { format } from "date-fns";
import {
	MapPin,
	Ruler,
	Bath,
	Bed,
	DollarSign,
	Calendar,
	Home,
} from "lucide-react";
import type {
	RealtorProperty,
	RentCastProperty,
} from "@/types/_dashboard/property";
import Image from "next/image";
import type React from "react";

interface PropertyCardProps {
	property: Property;
	selected: boolean;
	onSelect: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	property,
	selected,
	onSelect,
}) => {
	const isRealtor = isRealtorProperty(property);

	// Get primary image URL
	// Get primary image URL with type safety
	const primaryImage = isRealtor
		? (property as RealtorProperty).media.images.find((img) => img.isPrimary)
				?.url ||
			(property as RealtorProperty).media.images[0]?.url ||
			""
		: ""; // RentCast properties don't have direct image access in the type

	// Get property details with type safety
	const { address, details, metadata } = property;

	// Access property values based on type
	const listPrice = isRealtor
		? (property as RealtorProperty).metadata.listPrice
		: (property as RentCastProperty).metadata.lastSalePrice;

	const lastSoldDate = isRealtor
		? (property as RealtorProperty).metadata.lastSoldDate
		: (property as RentCastProperty).metadata.lastSaleDate;

	const soldPrice = isRealtor
		? undefined // Not available in RealtorProperty
		: (property as RentCastProperty).metadata.lastSalePrice;

	// Format price
	const formatPrice = (price: number | string | undefined | null): string => {
		if (price === undefined || price === null) return "N/A";
		const priceNum =
			typeof price === "string" ? Number.parseFloat(price) : price;
		if (Number.isNaN(priceNum)) return "N/A";

		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(priceNum);
	};

	// Format date
	const formatDate = (date: string | Date | undefined | null): string => {
		if (!date) return "N/A";
		try {
			return format(new Date(date), "MMM d, yyyy");
		} catch (e) {
			return "N/A";
		}
	};

	return (
		<Card
			className={`dark:border-gray-700 dark:bg-gray-900 group relative mx-auto max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
				selected ? "ring-2 ring-orange-500 ring-offset-2" : ""
			}`}
			aria-selected={selected}
		>
			<CardContent className="p-0">
				{/* Checkbox for selection */}
				<button
					type="button"
					className={`absolute border-gray-200 border-orange-500 border-2 dark:border-gray-700 flex focus:outline-none focus:ring-2 focus:ring-orange-500 h-8 hover:border-orange-500 items-center justify-center rounded-full shadow-md text-transparent transition-colors w-8 z-10 ${
						selected
							? "bg-orange-500 text-white"
							: "bg-white/80 dark:bg-gray-800/80 group-hover:text-gray-400"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						onSelect(property.id);
					}}
					aria-pressed={selected}
					tabIndex={0}
					title={selected ? "Deselect property" : "Select property"}
					aria-label={selected ? "Deselect property" : "Select property"}
				>
					{selected ? (
						<svg
							className="h-5 w-5 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							className="h-5 w-5 text-gray-500"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</button>

				{/* Property Image */}
				<div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
					{primaryImage ? (
						<Image
							src={primaryImage}
							alt={`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
							fill
							className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					) : (
						<div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
							<div className="h-12 w-12 text-gray-400">
								<MapPin className="h-full w-full" />
							</div>
						</div>
					)}
				</div>

				{/* Property Details */}
				<div className="p-4">
					<div className="mb-2">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{address.street}, {address.city}, {address.state}{" "}
							{address.zipCode}
						</h3>
					</div>

					{/* Price */}
					<div className="mb-3 flex items-center">
						<DollarSign className="mr-1 h-4 w-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{listPrice ? formatPrice(listPrice) : "Price not available"}
						</span>
					</div>

					{/* Last Sold */}
					{(lastSoldDate || soldPrice) && (
						<div className="mb-3 flex items-center">
							<Calendar className="mr-1 h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{lastSoldDate && `Last sold: ${formatDate(lastSoldDate)}`}
								{soldPrice && ` for ${formatPrice(soldPrice)}`}
							</span>
						</div>
					)}

					{/* Property Features */}
					<div className="grid grid-cols-3 gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
						<div className="flex items-center">
							<Bed className="mr-1 h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-700 dark:text-gray-300">
								{details.beds} {details.beds === 1 ? "bed" : "beds"}
							</span>
						</div>

						<div className="flex items-center">
							<Bath className="mr-1 h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-700 dark:text-gray-300">
								{details.fullBaths} {details.fullBaths === 1 ? "bath" : "baths"}
								{details.halfBaths ? `, ${details.halfBaths} half` : ""}
							</span>
						</div>

						<div className="flex items-center">
							<Ruler className="mr-1 h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-700 dark:text-gray-300">
								{details.sqft?.toLocaleString() || "N/A"} sqft
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PropertyCard;
