'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rnd } from 'react-rnd';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { PropertyResults } from '@/types/maps';

interface PropertyListProps {
  properties: PropertyResults[];
  onClose: () => void; // Function to handle closing the list
  onOpen: () => void; // Function to handle opening the list
}

const PropertyListView: React.FC<PropertyListProps> = ({
  properties,
  onClose,
  onOpen
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    if (isPanelOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isPanelOpen, onOpen, onClose]);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: window.innerHeight - (isPanelOpen ? 300 : 40), // Adjust y to stay at the bottom
        width: '100%',
        height: isPanelOpen ? '300px' : '40px' // Start with a 300px height when open
      }}
      minWidth="300px"
      minHeight="40px"
      bounds="window"
      disableDragging={isFullScreen}
      enableResizing={false} // Disable resizing to ensure consistent behavior
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <Card
        className={`h-full w-full overflow-hidden ${
          isFullScreen ? 'fixed inset-0' : 'rounded-t-lg'
        }`}
      >
        <div className="flex items-center justify-between bg-secondary p-2">
          <h2 className="text-lg font-semibold">List View</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
              {isFullScreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePanel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isPanelOpen && (
          <CardContent
            className="overflow-auto p-4"
            style={{ height: 'calc(100% - 40px)' }}
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
    </Rnd>
  );
};

export default PropertyListView;
