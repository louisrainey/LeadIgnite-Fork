'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CalendarIcon, ChevronDownIcon, InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { PropertyDetails } from '@/types/maps'; // Ensure you import the PropertyDetails type

export default function PropertyHeader({
  property
}: {
  property: PropertyDetails;
}) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full bg-white p-4 shadow-sm dark:bg-gray-900">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            {property.full_street_line}, {property.city}, {property.state}{' '}
            {property.zip_code}
            <InfoIcon className="h-5 w-5 text-gray-400" />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {property.beds} bed | {property.full_baths} bath |{' '}
            {property.sqft?.toLocaleString()} sqft |{' '}
            {property.lot_sqft?.toLocaleString()} lot sqft |{' '}
            {property.year_built} year built
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal dark:border-gray-700 dark:text-gray-100"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : <span>MM/DD/YYYY</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark:bg-gray-800">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[150px] dark:border-gray-700 dark:text-gray-100"
              >
                Status <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-800 dark:text-gray-100">
              <DropdownMenuItem>New Lead</DropdownMenuItem>
              <DropdownMenuItem>Follow Up</DropdownMenuItem>
              <DropdownMenuItem>Contract Sent</DropdownMenuItem>
              <DropdownMenuItem>Make Offer</DropdownMenuItem>
              <DropdownMenuItem>In Contract</DropdownMenuItem>
              <DropdownMenuItem>Closed Deal</DropdownMenuItem>
              <DropdownMenuItem>Dead Deal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Lead Activity
          </Button>
        </div>
      </div>
    </div>
  );
}
