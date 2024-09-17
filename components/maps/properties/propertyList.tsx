'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, Loader2 } from 'lucide-react';
import PropertyCard from './propertyCard';
import { PropertyDetails } from '@/types/_dashboard/maps';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { usePropertyStore } from '@/lib/stores/leadSearch/drawer'; // Zustand store import
import { toast } from 'sonner';
import SkipTraceDialog from './utils/createListModal';
import { mockLeadListData } from '@/constants/dashboard/leadList';

interface PropertyListProps {
  properties: PropertyDetails[];
}

const MIN_DRAWER_HEIGHT = 100; // Set a minimum height for the drawer to prevent it from being closed completely.

const PropertyListView: React.FC<PropertyListProps> = ({ properties }) => {
  // Destructure Zustand store state and actions
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerHeight,
    setDrawerHeight,
    visibleProperties,
    progressValue,
    listSizeLabel,
    hasMore,
    isLoading,
    loadMoreProperties
  } = usePropertyStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Handle infinite scrolling and loading more properties when the user reaches the bottom
  useEffect(() => {
    toast('Drawer Opened');
    if (!hasMore) return;

    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreProperties(); // Trigger loading more properties from Zustand store
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

  // Start resizing the drawer
  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault();
    window.addEventListener('mousemove', resizeDrawer);
    window.addEventListener('mouseup', stopResizing);
  };

  // Resize the drawer's height
  const resizeDrawer = (event: globalThis.MouseEvent) => {
    const newHeight = window.innerHeight - event.clientY;
    if (newHeight >= MIN_DRAWER_HEIGHT && newHeight <= window.innerHeight) {
      setDrawerHeight(newHeight); // Update drawer height using Zustand
    }
  };

  // Stop resizing
  const stopResizing = () => {
    window.removeEventListener('mousemove', resizeDrawer);
    window.removeEventListener('mouseup', stopResizing);
  };

  // Don't render anything if there are not enough properties
  if (properties.length <= 1) {
    return null;
  }

  return (
    <div
      style={{ position: 'absolute', right: 0, width: '400px', height: '100%' }}
    >
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="p-0" style={{ maxHeight: drawerHeight }}>
          {/* Drawer header and resize bar */}
          <div
            className="flex cursor-ns-resize items-center justify-between bg-secondary p-4"
            onMouseDown={startResizing} // Corrected event handler
          >
            <h2 className="text-lg font-semibold">
              {properties.length} Properties Fetched
            </h2>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          {/* Drawer content */}
          <CardContent
            className="overflow-auto"
            style={{ height: drawerHeight - 60 }}
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

                {/* Replace "Create List" button with the SkipTraceDialog */}
                <div className="flex justify-center">
                  <SkipTraceDialog
                    properties={properties}
                    availableListNames={mockLeadListData.map(
                      (list) => list.listName
                    )} // Extract and pass available list names
                    costPerRecord={0.1} // Example cost per record, you can change as needed
                  />
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PropertyListView;
