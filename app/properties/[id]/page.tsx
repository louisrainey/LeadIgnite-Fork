import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilIcon, SearchIcon } from 'lucide-react';
import { PropertyDetails } from '@/types/maps';
import { Button } from '@/components/ui/button';
import { detailed_properties_saved } from '@/constants/data/properties';
import { notFound } from 'next/navigation';
import PropertyMap from '@/components/maps/properties/propertyMap';
import { Progress } from '@/components/ui/progress';
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
  const equity =
    property.estimated_value && property.mortgage_balance
      ? property.estimated_value - property.mortgage_balance
      : 0;

  const equityPercentage = property.estimated_value
    ? (equity / property.estimated_value) * 100
    : 0;

  let equityStatus = 'Low';
  if (equityPercentage > 70) {
    equityStatus = 'High';
  } else if (equityPercentage > 40) {
    equityStatus = 'Medium';
  }

  return (
    <div className="mx-auto w-full max-w-full">
      {' '}
      {/* Full-width container */}
      {/* Google Maps replacing Placeholder Image */}
      <div className="relative mb-4 h-64 w-full">
        <PropertyMap
          latitude={property.latitude}
          longitude={property.longitude}
          address={`${property.street}, ${property.city}, ${property.state} ${property.zip_code}`}
          details={`${property.beds} bed | ${property.full_baths} bath | ${property.sqft} sqft | ${property.year_built} year built`}
        />
      </div>
      {/* Property Details */}
      <Card>
        <CardContent className="p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
            <div>
              <h2 className="mb-2 font-semibold">Owner Name</h2>
              <div className="flex items-center">
                {property.agent}{' '}
                <PencilIcon className="ml-2 h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">
                Mortgages{' '}
                <span className="rounded-full bg-gray-200 px-2 text-sm">0</span>
              </h2>
              <div>-</div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">
                Equity <span className="text-sm text-gray-500">(est.)</span>
              </h2>
              <div className="flex items-center">
                {property.estimated_value
                  ? `$${equity.toLocaleString()} | ${equityPercentage.toFixed(
                      2
                    )}%`
                  : 'N/A'}{' '}
                <span
                  className={`ml-2 text-sm text-${
                    equityStatus === 'High'
                      ? 'green'
                      : equityStatus === 'Medium'
                      ? 'yellow'
                      : 'red'
                  }-500`}
                >
                  {equityStatus}
                </span>
              </div>
              <Progress
                value={equityPercentage}
                className="mt-2 h-2 rounded-full bg-blue-500"
              />
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Occupancy</h2>
              <div>Owner Occupied</div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Taxes</h2>
              <div>
                $
                {property.hoa_fee
                  ? `${property.hoa_fee.toLocaleString()}/mo`
                  : 'N/A'}
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Est. Value</h2>
              <div>
                $
                {property.estimated_value
                  ? property.estimated_value.toLocaleString()
                  : 'N/A'}
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Last Sale</h2>
              <div>{property.last_sold_date || '-'}</div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">MLS</h2>
              <div>{property.mls_id || 'Inactive'}</div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">
                FMR <span className="text-sm text-gray-500">(HUD)</span>
              </h2>
              <div>$2,750.00/mo</div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">
                Rent <span className="text-sm text-gray-500">(est.)</span>
              </h2>
              <div>$2,750.00/mo</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="flex overflow-auto">
          {' '}
          {/* Added classes to handle overflow */}
          <TabsTrigger value="overview" className="flex-1">
            Overview
          </TabsTrigger>
          <TabsTrigger value="property-details" className="flex-1">
            Property Details
          </TabsTrigger>
          <TabsTrigger value="mls-details" className="flex-1">
            MLS Details
          </TabsTrigger>
          <TabsTrigger value="tax-information" className="flex-1">
            Tax Information
          </TabsTrigger>
          <TabsTrigger value="linked-properties" className="flex-1">
            Linked Properties
          </TabsTrigger>
          <TabsTrigger value="foreclosures-liens" className="flex-1">
            Foreclosures & Liens
          </TabsTrigger>
          <TabsTrigger value="mortgage-transactions" className="flex-1">
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
