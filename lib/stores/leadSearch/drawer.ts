import { create } from 'zustand';
import { PropertyDetails } from '@/types/_dashboard/maps';
import { MockInHouseLeadAgrigator } from '@/constants/dashboard/properties';

interface PropertyStoreState {
  isDrawerOpen: boolean;
  drawerHeight: number;
  properties: PropertyDetails[];
  visibleProperties: PropertyDetails[];
  progressValue: number;
  listSizeLabel: string;
  hasMore: boolean;
  isLoading: boolean;

  setIsDrawerOpen: (open: boolean) => void;
  setDrawerHeight: (height: number) => void;
  loadMoreProperties: () => void;
  setProperties: (properties: PropertyDetails[]) => void;
}

const MAX_CARDS_PER_LOAD = 6;
const MIN_DRAWER_HEIGHT = 100;

export const usePropertyStore = create<PropertyStoreState>((set, get) => ({
  // Initial states
  isDrawerOpen: false,
  drawerHeight: 800,
  properties: [],
  visibleProperties: [],
  progressValue: 0,
  listSizeLabel: 'Specific',
  hasMore: true,
  isLoading: false,

  // Actions
  setIsDrawerOpen: (open) => set({ isDrawerOpen: open }),

  setDrawerHeight: (height) => {
    if (height >= MIN_DRAWER_HEIGHT) {
      set({ drawerHeight: height });
    }
  },

  setProperties: (properties) => {
    console.log('Setting properties:', properties);

    // Set the properties first
    set({ properties });

    // Then derive visible properties after setting properties
    const visibleProps = properties.slice(0, MAX_CARDS_PER_LOAD);

    console.log('Visible properties after slice:', visibleProps);

    set({
      visibleProperties: visibleProps,
      progressValue:
        properties.length <= 100 ? 25 : properties.length <= 10000 ? 50 : 75,
      listSizeLabel:
        properties.length <= 100
          ? 'Specific'
          : properties.length <= 10000
          ? 'Moderate'
          : 'Broad',
      hasMore: properties.length > MAX_CARDS_PER_LOAD
    });
  },

  loadMoreProperties: () => {
    const { properties, visibleProperties, isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });

    setTimeout(() => {
      const nextProperties = properties.slice(
        visibleProperties.length,
        visibleProperties.length + MAX_CARDS_PER_LOAD
      );
      set({
        visibleProperties: [...visibleProperties, ...nextProperties],
        hasMore: nextProperties.length === MAX_CARDS_PER_LOAD,
        isLoading: false
      });
    }, 1000); // Simulate network delay
  }
}));
