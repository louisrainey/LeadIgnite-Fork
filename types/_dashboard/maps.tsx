import type { z } from "zod";
import type { mapFormSchema } from "../zod/propertyList";

export type AddressCoordinate = {
	address: string;
	lat: number;
	lng: number;
};
export type MapFormSchemaType = z.infer<typeof mapFormSchema>;

export type Coordinate = {
	lat: number;
	lng: number;
};
export type LeadLocationPhone = {
	ext: string | null;
	number: string | null;
	primary: boolean | null;
	type: "Office" | "Mobile" | "Home" | "Fax" | null; // Assuming these are possible values
};
