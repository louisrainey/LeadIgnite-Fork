import { z } from 'zod';
import { mapFormSchema } from './zod/propertyList';

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

export interface PropertyResults {
  property_url?: string;
  mls?: string;
  mls_id?: string;
  status?: string;
  street?: string;
  unit?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  style?: string;
  beds?: number;
  full_baths?: number;
  half_baths?: number;
  sqft?: number;
  year_built?: number;
  stories?: number;
  garage?: string;
  lot_sqft?: number;
  days_on_mls?: number;
  list_price?: string;
  list_price_min?: string;
  list_price_max?: string;
  list_date?: string;
  pending_date?: string;
  sold_price?: string;
  last_sold_date?: string;
  price_per_sqft?: string;
  new_construction?: boolean;
  hoa_fee?: string;
  latitude?: number;
  longitude?: number;
  nearby_schools?: string[];
  agent_id?: string;
  agent_name?: string;
  agent_email?: string;
  agent_phone?: string;
  broker_id?: string;
  broker_name?: string;
  builder_id?: string;
  builder_name?: string;
  office_id?: string;
  office_name?: string;
  office_phones?: string[];
  office_email?: string;
}
