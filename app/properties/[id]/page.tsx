import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilIcon, SearchIcon } from 'lucide-react';
import { PropertyDetails } from '@/types/maps';
import { Button } from '@/components/ui/button';
import { detailed_properties_saved } from '@/constants/data/properties';
import { notFound } from 'next/navigation';
import PropertyMap from '@/components/maps/properties/propertyMap';

// Async function to fetch property data
async function fetchProperty(id: string): Promise<PropertyDetails | null> {
  try {
    const response = await fetch(`https://api.example.com/properties/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return null;
    }

    const property: PropertyDetails = await response.json();
    return property;
  } catch (error) {
    console.error('Failed to fetch property data:', error);
    return null;
  }
}

export default async function PropertyPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch property data
  let property = await fetchProperty(id);

  // If property data is not found, use the default one
  if (!property) {
    property = detailed_properties_saved[0];
  }

  // If still no property data, render a 404 page
  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Google Maps replacing Placeholder Image */}
      <div className="relative mb-4 h-48 w-full">
        <PropertyMap
          latitude={property.latitude}
          longitude={property.longitude}
          address={`${property.street}, ${property.city}, ${property.state} ${property.zip_code}`}
          details={`${property.beds} bed | ${property.full_baths} bath | ${property.sqft} sqft`}
        />{' '}
      </div>

      {/* Property Details */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Owner Name */}
            {property.agent && (
              <div>
                <h2 className="mb-2 font-semibold">Owner Name</h2>
                <div className="flex items-center">
                  {property.agent}{' '}
                  <PencilIcon className="ml-2 h-4 w-4 text-blue-500" />
                </div>
              </div>
            )}

            {/* Mortgages */}
            {/* Assuming mortgages data would be available separately. If not, you can remove this section */}

            {/* Equity */}
            {property.estimated_value !== null && (
              <div>
                <h2 className="mb-2 font-semibold">
                  Equity <span className="text-sm text-gray-500">(est.)</span>
                </h2>
                <div className="flex items-center">
                  ${property.estimated_value.toLocaleString()}
                  <span className="ml-2 text-sm text-blue-500">
                    100% | High
                  </span>
                </div>
              </div>
            )}

            {/* Occupancy */}
            {/* Assuming occupancy information is static as "Owner Occupied". If dynamic, update accordingly */}

            {/* Taxes */}
            {property.hoa_fee !== null && (
              <div>
                <h2 className="mb-2 font-semibold">Taxes</h2>
                <div>${property.hoa_fee.toLocaleString()}/mo</div>
              </div>
            )}

            {/* Est. Value */}
            {property.estimated_value !== null && (
              <div>
                <h2 className="mb-2 font-semibold">Est. Value</h2>
                <div>${property.estimated_value.toLocaleString()}</div>
              </div>
            )}

            {/* Last Sale */}
            {property.last_sold_date && (
              <div>
                <h2 className="mb-2 font-semibold">Last Sale</h2>
                <div>{property.last_sold_date}</div>
              </div>
            )}

            {/* MLS */}
            {property.mls_id && (
              <div>
                <h2 className="mb-2 font-semibold">MLS</h2>
                <div>{property.mls_id}</div>
              </div>
            )}
            {/* FMR (HUD) */}
            {/* Assuming FMR data would be static or available separately */}

            {/* Rent (est.) */}
            {/* Assuming Rent (est.) is static. If dynamic, update accordingly */}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="property-details">Property Details</TabsTrigger>
          <TabsTrigger value="mls-details">MLS Details</TabsTrigger>
          <TabsTrigger value="tax-information">Tax Information</TabsTrigger>
          <TabsTrigger value="linked-properties">Linked Properties</TabsTrigger>
          <TabsTrigger value="foreclosures-liens">
            Foreclosures & Liens
          </TabsTrigger>
          <TabsTrigger value="mortgage-transactions">
            Mortgage & Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <SearchIcon className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-x-2">
                <Button variant="outline">Add Contact Info</Button>
                <Button variant="outline">Skip Trace</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Add other TabsContent components for the remaining tabs */}
      </Tabs>
    </div>
  );
}
