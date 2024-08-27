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
import { convertAddressesToMarkers } from '@/api/coordinates';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddressCoordinate, Coordinate, MapFormSchemaType } from '@/types/maps';
import { mapFormSchema } from '@/types/zod/propertyList';
import {
  mockFetchAddressesFromApi,
  calculateCenter
} from '@/constants/utility/maps';

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
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col"
    >
      <div className="border-b p-4">
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-full py-2 pl-10 pr-4"
                  placeholder="State, Zip, County, Street, Neighborhood, or Address"
                  {...field}
                />
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
                  <SelectItem value="for_rent">For Rent</SelectItem>
                  <SelectItem value="for_sale">For Sale</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
                  <SelectItem value="5">5+ Beds</SelectItem>
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
                  <SelectItem value="5">5+ Baths</SelectItem>
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
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="multi_family">
                    Multi-Family Home
                  </SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="new_construction">
                    New Construction
                  </SelectItem>
                  <SelectItem value="mobile_home">Mobile Home</SelectItem>
                  <SelectItem value="farm_ranch">Farm/Ranch</SelectItem>
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
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="radius">Radius</Label>
                      <Input
                        id="radius"
                        type="number"
                        placeholder="Enter radius"
                        {...field}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="advanced.pastDays"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="past_days">Past Days</Label>
                      <Input
                        id="past_days"
                        type="number"
                        placeholder="Enter days"
                        {...field}
                      />
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
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="proxy">Proxy</Label>
                      <Input id="proxy" placeholder="Enter proxy" {...field} />
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
                  render={({ field }) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="limit">Limit</Label>
                      <Input
                        id="limit"
                        type="number"
                        placeholder="Enter limit"
                        {...field}
                      />
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
