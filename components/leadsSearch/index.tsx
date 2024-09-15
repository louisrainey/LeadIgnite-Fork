import React, { useEffect, useState } from 'react';
import { Search, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import MapComponent from '@/components/maps';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Coordinate,
  MapFormSchemaType,
  PropertyDetails
} from '@/types/_dashboard/maps';
import { mapFormSchema } from '@/types/zod/propertyList';
import {
  mockFetchAddressesFromApi,
  calculateCenter
} from '@/constants/utility/maps';
import PropertyListView from '@/components/maps/properties/propertyList';
import { detailed_properties_saved } from '@/constants/dashboard/properties';
import { checkForSQLInjection } from '@/constants/utility/sqlCheck';

export default function LeadsComponent() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [markers, setMarkers] = useState([
    { lat: 39.7392, lng: -104.9903 },
    { lat: 39.7294, lng: -104.8319 }
  ]);
  const [center, setCenter] = useState<Coordinate>({
    lat: 39.7392,
    lng: -104.9903
  });

  const [properties, setProperties] = useState<PropertyDetails[]>(
    detailed_properties_saved
  ); // Add this state

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(mapFormSchema),
    defaultValues: {
      location: '',
      marketStatus: '',
      beds: '',
      baths: '',
      propertyType: '',
      advanced: {
        radius: '',
        pastDays: '',
        dateFrom: '',
        dateTo: '',
        mlsOnly: false,
        foreclosure: false,
        proxy: '',
        extraPropertyData: false,
        excludePending: false,
        limit: ''
      }
    }
  });

  const onSubmit = async (data: MapFormSchemaType) => {
    const apiKey = process.env.NEXT_PUBLIC_GMAPS_KEY || '';
    alert('Submitted');
    // Use the location from form data to fetch addresses from the mock API
    const fetchedCoordinates = await mockFetchAddressesFromApi([data.location]);
    console.log('Fetched Coordinates:', fetchedCoordinates);

    // Convert the fetched addresses and coordinates to markers directly
    const newMarkers = fetchedCoordinates.map((coord) => ({
      lat: coord.lat,
      lng: coord.lng
    }));
    console.log('New Markers:', newMarkers);

    // Only set markers if newMarkers is not empty
    if (newMarkers && newMarkers.length > 0) {
      setMarkers(newMarkers);

      // Calculate and set the center based on the new markers
      const newCenter = calculateCenter(newMarkers);
      setCenter(newCenter);
      console.log('New Center:', newCenter);
    }
  };
  return (
    <form
      onSubmit={() => handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col"
    >
      <div className="border-b p-4">
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Input
                    className="w-full py-2 pl-10 pr-4"
                    placeholder="State, Zip, County, Street, Neighborhood, or Address"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (checkForSQLInjection(value)) {
                        field.onChange(''); // Clear the field if it contains SQL injection patterns
                      } else {
                        field.onChange(value); // Keep the value if it's safe
                      }
                    }}
                    onBlur={() => {
                      field.onBlur();
                    }}
                  />
                  {/* {error && <p className="text-red-500">{error.message}</p>} */}
                </div>
              )}
            />
          </div>

          <Controller
            name="marketStatus"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value || 'Market Status'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="beds"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value || 'Beds'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bed</SelectItem>
                  <SelectItem value="2">2 Beds</SelectItem>
                  <SelectItem value="3">3 Beds</SelectItem>
                  <SelectItem value="4">4 Beds</SelectItem>
                  <SelectItem value="5+">5+ Beds</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="baths"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value || 'Baths'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bath</SelectItem>
                  <SelectItem value="2">2 Baths</SelectItem>
                  <SelectItem value="3">3 Baths</SelectItem>
                  <SelectItem value="4">4 Baths</SelectItem>
                  <SelectItem value="5+">5+ Baths</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value || 'Property Type'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_family">
                    Single Family Home
                  </SelectItem>
                  <SelectItem value="Condo">Condo</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Multi-Family">
                    Multi-Family Home
                  </SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                  <SelectItem value="New Construction">
                    New Construction
                  </SelectItem>
                  <SelectItem value="Mobile Home">Mobile Home</SelectItem>
                  <SelectItem value="Farm/Ranch">Farm/Ranch</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Dialog open={showAdvanced} onOpenChange={setShowAdvanced}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Advanced
                <Sliders className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Advanced Filters</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Controller
                  name="advanced.radius"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="radius">Radius</Label>
                      <Input
                        id="radius"
                        type="text"
                        inputMode="decimal"
                        placeholder="Enter radius"
                        {...field}
                        value={field.value} // Ensure the controlled value is used
                        onChange={(e) => {
                          // Optionally, you can sanitize the input or allow the Zod validation to handle it
                          const value = e.target.value;

                          // Allow only valid numeric input up to 6 characters
                          if (
                            /^\d{0,6}(\.\d{0,5})?$/.test(value) &&
                            !checkForSQLInjection(value)
                          ) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;

                          // Optionally, clear invalid input when the field loses focus
                          if (
                            !/^\d{1,6}(\.\d{1,5})?$/.test(e.target.value) &&
                            checkForSQLInjection(value)
                          ) {
                            field.onChange(''); // Clear the field if the input is invalid
                          }
                        }}
                      />
                      {error && <p className="text-red-500">{error.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="advanced.pastDays"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="past_days">Past Days</Label>
                      <Input
                        id="past_days"
                        type="text" // Changed to text to match better control over the input
                        inputMode="numeric" // Helps mobile browsers show numeric keyboards
                        placeholder="Enter days"
                        {...field}
                        value={field.value} // Ensure the controlled value is used
                        onChange={(e) => {
                          const value = e.target.value;
                          // Optional: Allow only up to 5 digits
                          if (
                            /^\d{0,5}$/.test(value) &&
                            !checkForSQLInjection(value)
                          ) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur(); // Trigger any additional validation onBlur
                        }}
                      />
                      {error && <p className="text-red-500">{error.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="advanced.dateFrom"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="date_from">Date From</Label>
                      <Input id="date_from" type="date" {...field} />
                    </div>
                  )}
                />

                <Controller
                  name="advanced.dateTo"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="date_to">Date To</Label>
                      <Input id="date_to" type="date" {...field} />
                    </div>
                  )}
                />

                <Controller
                  name="advanced.mlsOnly"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mls_only"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      <Label htmlFor="mls_only">MLS Only</Label>
                    </div>
                  )}
                />

                <Controller
                  name="advanced.foreclosure"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="foreclosure"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      <Label htmlFor="foreclosure">Foreclosure</Label>
                    </div>
                  )}
                />

                <Controller
                  name="advanced.proxy"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="proxy">Proxy</Label>
                      <Input
                        id="proxy"
                        type="text"
                        placeholder="Ex: http://user:pass@host:port"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value); // Allow user to type freely
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          // Validate the input on blur to ensure it starts with http or https
                          if (
                            /^https?:\/\/.*/.test(value) ||
                            (value === '' && !checkForSQLInjection(value))
                          ) {
                            field.onChange(value);
                          } else {
                            field.onChange(''); // Clear the field if it doesn't start with http or https
                          }
                          field.onBlur();
                        }}
                      />
                      {error && <p className="text-red-500">{error.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="advanced.extraPropertyData"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extra_property_data"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      <Label htmlFor="extra_property_data">
                        Extra Property Data
                      </Label>
                    </div>
                  )}
                />

                <Controller
                  name="advanced.excludePending"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exclude_pending"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      <Label htmlFor="exclude_pending">Exclude Pending</Label>
                    </div>
                  )}
                />

                <Controller
                  name="advanced.limit"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="limit">Limit</Label>
                      <Input
                        id="limit"
                        type="text" // Restrict input to numeric values
                        placeholder="Enter a number between 1 and 10,000"
                        {...field}
                        value={field.value || ''} // Ensure value is a string or empty string
                        min={1}
                        max={10000}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = parseInt(value, 10);

                          // Ensure the input is a number between 1 and 10,000
                          if (
                            !isNaN(numericValue) &&
                            numericValue >= 1 &&
                            numericValue <= 10000 &&
                            !checkForSQLInjection(value)
                          ) {
                            field.onChange(value);
                          } else if (value === '') {
                            field.onChange(''); // Allow clearing the input
                          }
                        }}
                      />
                      {error && <p className="text-red-500">{error.message}</p>}
                    </div>
                  )}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative flex-grow">
        <MapComponent
          apiKey={process.env.NEXT_PUBLIC_GMAPS_KEY || ''}
          center={center}
          markers={markers}
          zoom={10}
        />
      </div>
    </form>
  );
}
