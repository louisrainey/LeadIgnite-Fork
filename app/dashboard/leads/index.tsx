import React, { useState } from 'react';
import { Search, Sliders, MapPin, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
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

export default function LeadsComponent() {
  const [view, setView] = useState<'roadmap' | 'satellite'>('roadmap');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [markers, setMarkers] = useState([{ lat: 39.7392, lng: -104.9903 }]); // Example markers

  const center = {
    lat: 39.7392, // Example: Denver's Latitude
    lng: -104.9903 // Example: Denver's Longitude
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="border-b p-4">
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              className="w-full py-2 pl-10 pr-4"
              placeholder="State, Zip, County, Street, Neighborhood, or Address"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Market Status" />
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Beds & Baths" />
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
          </Select>
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
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="radius">Radius</Label>
                  <Input id="radius" type="number" placeholder="Enter radius" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="past_days">Past Days</Label>
                  <Input
                    id="past_days"
                    type="number"
                    placeholder="Enter days"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="date_from">Date From</Label>
                  <Input id="date_from" type="date" />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="date_to">Date To</Label>
                  <Input id="date_to" type="date" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mls_only" />
                  <Label htmlFor="mls_only">MLS Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="foreclosure" />
                  <Label htmlFor="foreclosure">Foreclosure</Label>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="proxy">Proxy</Label>
                  <Input id="proxy" placeholder="Enter proxy" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="extra_property_data" />
                  <Label htmlFor="extra_property_data">
                    Extra Property Data
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exclude_pending" />
                  <Label htmlFor="exclude_pending">Exclude Pending</Label>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="limit">Limit</Label>
                  <Input id="limit" type="number" placeholder="Enter limit" />
                </div>
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
          mapType={view}
          zoom={10}
        />
      </div>
    </div>
  );
}
