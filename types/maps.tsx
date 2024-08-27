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
