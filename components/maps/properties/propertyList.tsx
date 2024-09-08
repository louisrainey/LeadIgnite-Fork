'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import { PropertyDetails } from '@/types/_dashboard/maps';
import PropertyCard from './propertyCard';
import { Loader2 } from 'lucide-react'; // Import a loading spinner icon from lucide-react

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
  const [panelHeight, setPanelHeight] = useState(300);
  const [progressValue, setProgressValue] = useState(0);
  const [listSizeLabel, setListSizeLabel] = useState('');
  const [visibleProperties, setVisibleProperties] = useState<PropertyDetails[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const maxCardsPerLoad = 6;

  useEffect(() => {
    const propertyCount = properties.length;

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

  const loadMoreProperties = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProperties((prev) => {
        const nextProperties = properties.slice(
          prev.length,
          prev.length + maxCardsPerLoad
        );
        if (nextProperties.length < maxCardsPerLoad) {
          setHasMore(false);
        }
        setIsLoading(false);
        return [...prev, ...nextProperties];
      });
    }, 1000); // Simulate network delay
  }, [properties]);

  useEffect(() => {
    if (visibleProperties.length === 0 && properties.length > 0) {
      loadMoreProperties(); // Load initial set of properties
    }
  }, [loadMoreProperties, properties]);

  useEffect(() => {
    if (!hasMore) return;

    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreProperties();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      loadMoreObserver.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        loadMoreObserver.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loadMoreProperties, isLoading]);

  return (
    <div
      style={{ height: `${isPanelOpen ? panelHeight : 40}px`, width: '100%' }}
    >
      <Card className="h-full overflow-hidden rounded-none">
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
                <div className="flex justify-center">
                  <Button type="button">Create List</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {visibleProperties.map((property, index) => (
                  <div key={index} className="p-4">
                    <PropertyCard property={property} />
                  </div>
                ))}
                {hasMore && (
                  <div ref={loadMoreRef} className="flex justify-center p-4">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PropertyListView;
