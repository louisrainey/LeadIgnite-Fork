'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Import the Progress component
import { X } from 'lucide-react';
import { PropertyDetails } from '@/types/maps';
import PropertyCard from './propertyCard';

interface PropertyListProps {
  properties: PropertyDetails[];
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
  const [progressValue, setProgressValue] = useState(0); // Progress value (will be calculated)
  const [listSizeLabel, setListSizeLabel] = useState(''); // Label to show Specific, Moderate, Broad

  useEffect(() => {
    const propertyCount = properties.length;

    // Determine the progress value based on property count
    if (propertyCount <= 100) {
      setProgressValue(25);
      setListSizeLabel('Specific');
    } else if (propertyCount <= 10000) {
      setProgressValue(50);
      setListSizeLabel('Moderate');
    } else {
      setProgressValue(75);
      setListSizeLabel('Broad');
    }
  }, [properties.length]);

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
          <h2 className="text-lg font-semibold">
            {properties.length} Properties Fetched
          </h2>
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
                <h3 className="text-lg font-semibold">
                  List Size ({listSizeLabel})
                </h3>
                <div className="flex items-center space-x-4">
                  <span>Specific</span>
                  <Progress value={progressValue} className="flex-1" />
                  <span>Broad</span>
                </div>
                <p>Your list size is defined by your search and filters.</p>
                {progressValue === 75 && (
                  <p className="font-semibold text-red-600">
                    Your list is too broad.
                  </p>
                )}
                <Button>Create List</Button>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {properties.map((property, index) => (
                  <div key={index} className="p-4">
                    <PropertyCard property={property} />
                  </div>
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
