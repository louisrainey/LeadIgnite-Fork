import React, { useEffect, useRef, useCallback } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterDropdownProps {
  selectedCampaign: string | undefined;
  setSelectedCampaign: (value: string) => void;
  selectedStatus: string | undefined;
  setSelectedStatus: (value: string) => void;
  resetFilter: () => void;
  applyFilter: () => void;
  closeDropdown: () => void; // Function to close dropdown from parent
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedCampaign,
  setSelectedCampaign,
  selectedStatus,
  setSelectedStatus,
  resetFilter,
  applyFilter,
  closeDropdown
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom close handler that only closes the dropdown if clicking outside of it
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Element; // Cast to Element

      // Prevent closing if click happens inside the dropdown or a Select dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('.ui-select') // Exclude the `Select` dropdowns by checking class or unique identifier
      ) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Disable the apply button if neither campaign nor status is selected
  const isApplyDisabled =
    (selectedCampaign === undefined || selectedCampaign === 'None') &&
    (selectedStatus === undefined || selectedStatus === 'None');

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
    >
      <div className="space-y-4 p-4">
        {/* Campaign Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Campaign
          </label>
          <Select
            value={selectedCampaign || 'None'}
            onValueChange={(value) => {
              setSelectedCampaign(value);
            }}
          >
            <SelectTrigger className="ui-select w-full">
              <SelectValue placeholder="Select campaign(s)" />
            </SelectTrigger>
            <SelectContent className="ui-select">
              <SelectGroup>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="campaign1">Campaign 1</SelectItem>
                <SelectItem value="campaign2">Campaign 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <Select
            value={selectedStatus || 'None'}
            onValueChange={(value) => {
              setSelectedStatus(value);
            }}
          >
            <SelectTrigger className="ui-select w-full">
              <SelectValue placeholder="Select status(es)" />
            </SelectTrigger>
            <SelectContent className="ui-select">
              <SelectGroup>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Reset and Apply Buttons */}
        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={resetFilter}>
            Reset
          </Button>
          <Button
            variant="default"
            onClick={applyFilter}
            disabled={isApplyDisabled}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
