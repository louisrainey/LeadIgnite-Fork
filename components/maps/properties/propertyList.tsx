'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { PropertyResults } from '@/types/maps';

interface PropertyListProps {
  properties: PropertyResults[];
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PropertyListView: React.FC<PropertyListProps> = ({
  properties,
  onClose,
  onOpen
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [panelHeight, setPanelHeight] = useState(300); // Initial height

  useEffect(() => {
    if (isPanelOpen) {
      onOpen(
        new MouseEvent('click') as unknown as React.MouseEvent<
          HTMLButtonElement,
          MouseEvent
        >
      );
    } else {
      onClose(
        new MouseEvent('click') as unknown as React.MouseEvent<
          HTMLButtonElement,
          MouseEvent
        >
      );
    }
  }, [isPanelOpen, onOpen, onClose]);

  const togglePanel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsPanelOpen(!isPanelOpen);
  };

  const startResizing = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    window.addEventListener('mousemove', resizePanel);
    window.addEventListener('mouseup', stopResizing);
  };

  const resizePanel = (event: MouseEvent) => {
    const newY = window.innerHeight - event.clientY;
    if (newY >= 100 && newY <= window.innerHeight) {
      setPanelHeight(newY);
    }
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resizePanel);
    window.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div
      style={{ height: `${isPanelOpen ? panelHeight : 40}px`, width: '100%' }}
    >
      <Card className="h-full overflow-hidden rounded-none">
        {/* Top bar for dragging */}
        <div
          className="flex cursor-pointer items-center justify-between bg-secondary p-2"
          onMouseDown={startResizing}
        >
          <h2 className="text-lg font-semibold">List View</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={togglePanel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isPanelOpen && (
          <CardContent
            className="overflow-auto p-4"
            style={{
              height: isPanelOpen ? `calc(${panelHeight}px - 40px)` : '40px'
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">List Size</h3>
                <p className="text-sm text-muted-foreground">
                  Your list size is defined by your search and filters.
                </p>
                <p className="font-semibold">Your list is too broad.</p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Results: {properties.length}
                </h3>
                <Button>Create List</Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {properties.map((property, index) => (
                  <Card key={index}>
                    <CardContent className="flex p-4">
                      <Image
                        src={property.property_url || '/placeholder.svg'}
                        alt={property.street || 'Property Image'}
                        width={150}
                        height={150}
                        className="mr-4 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">
                          {property.street}, {property.city}, {property.state}{' '}
                          {property.zip_code}
                        </h4>
                        <p>Est. Value: {property.list_price}</p>
                        <p>Last Sale: {property.last_sold_date}</p>
                        <p>Sold Price: {property.sold_price}</p>
                        <p>
                          {property.beds} bed | {property.full_baths} full bath
                          | {property.sqft} sqft
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PropertyListView;
