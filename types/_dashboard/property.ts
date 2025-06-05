// types/_dashboard/property.ts
import { v4 as uuidv4 } from "uuid";

/**
 * Base property interface with common fields for all properties
 */
export interface BaseProperty {
	/** Unique identifier */
	id: string;

	/** Property address */
	address: {
		street: string;
		unit?: string | null;
		city: string;
		state: string;
		zipCode: string;
		fullStreetLine: string;
		latitude: number;
		longitude: number;
	};

	/** Basic property details */
	details: {
		beds: number;
		fullBaths: number;
		halfBaths: number | null;
		sqft: number | null;
		yearBuilt: number;
		lotSqft: number | null;
		propertyType: string;
		stories: number;
		style: string;
		construction: string;
		roof: string;
		parking: string;
	};

	/** Source of the property data */
	source: "rentcast" | "realtor";

	/** Last update timestamp */
	lastUpdated: string;
}

// Property metadata interface
export interface PropertyMetadata {
	// Listing information
	listPrice: number;
	pricePerSqft: number;
	status: string;
	mlsId: string;
	mls: string;
	listDate: string;
	lastSoldDate: string;
	daysOnMarket: number;
	hoaFee?: number;
	parkingGarage: number;
	nearbySchools: string;
	neighborhoods: string;

	// Agent information
	agent: {
		name: string;
		email: string;
		phones: Array<{
			number: string;
			primary: boolean;
			type: string;
			ext: string | null;
		}>;
		broker: string;
	};
}

// Forward declarations to avoid circular dependencies
export interface RealtorProperty extends Omit<BaseProperty, "source"> {
	source: "realtor";
	metadata: PropertyMetadata;

	media: {
		images: Array<{
			url: string;
			isPrimary: boolean;
			label?: string;
		}>;
		virtualTours: Array<{
			url: string;
			type: string;
			thumbnail: string;
		}>;
	};
	description: string;
}

export interface RentCastProperty extends BaseProperty {
	source: "rentcast";
	// RentCast-specific fields will be defined in rentcast_off_market.ts
}

export type Property = RealtorProperty | RentCastProperty;

// Type guards
export function isRealtorProperty(
	property: Property,
): property is RealtorProperty {
	return property.source === "realtor";
}

export function isRentCastProperty(
	property: Property,
): property is RentCastProperty {
	return property.source === "rentcast";
}

// Factory functions
export function createBaseProperty(
	overrides: Partial<BaseProperty> = {},
): BaseProperty {
	const now = new Date().toISOString();
	return {
		id: overrides.id || uuidv4(),
		address: {
			street: "",
			unit: null,
			city: "",
			state: "",
			zipCode: "",
			fullStreetLine: "",
			latitude: 0,
			longitude: 0,
			...overrides.address,
		},
		details: {
			beds: 0,
			fullBaths: 0,
			halfBaths: null,
			sqft: null,
			yearBuilt: 0,
			lotSqft: null,
			propertyType: "Unknown",
			stories: 0,
			style: "",
			construction: "",
			roof: "",
			parking: "",
			...overrides.details,
		},
		source: "rentcast", // Default, can be overridden
		lastUpdated: now,
		...overrides,
	};
}

export function createRealtorProperty(
	overrides: Partial<RealtorProperty> &
		Pick<RealtorProperty, "metadata" | "media" | "description">,
): RealtorProperty {
	const base = createBaseProperty(overrides);
	return {
		...base,
		source: "realtor",
		...overrides,
	} as RealtorProperty;
}
export function createRentCastProperty(
	overrides: Partial<RentCastProperty> = {},
): RentCastProperty {
	const base = createBaseProperty(overrides);
	return {
		...base,
		source: "rentcast",
		// RentCast-specific fields will be added by the caller
		...overrides,
	};
}
