import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; // Icon for the close button

interface FilterDropdownProps {
  selectedListName: string | undefined;
  setSelectedListName: (value: string) => void;
  selectedRecordRange: string | undefined;
  setSelectedRecordRange: (value: string) => void;
  selectedUploadDate: string | undefined;
  setSelectedUploadDate: (value: string) => void;
  resetFilter: () => void;
  applyFilter: () => void;
  closeDropdown: () => void; // Function to close dropdown from parent
}

const FilterListsDropdown: React.FC<FilterDropdownProps> = ({
  selectedListName,
  setSelectedListName,
  selectedRecordRange,
  setSelectedRecordRange,
  selectedUploadDate,
  setSelectedUploadDate,
  resetFilter,
  applyFilter,
  closeDropdown // This function will be triggered when the X button is clicked
}) => {
  // Disable the apply button if none of the filters are selected
  const isApplyDisabled =
    (!selectedListName || selectedListName === 'None') &&
    (!selectedRecordRange || selectedRecordRange === 'None') &&
    (!selectedUploadDate || selectedUploadDate === 'None');

  return (
    <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
      {/* Close Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={closeDropdown}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 p-4">
        {/* List Name Filter */}

        {/* Record Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Records Range
          </label>
          <Select
            value={selectedRecordRange || 'None'}
            onValueChange={(value) => setSelectedRecordRange(value)}
          >
            <SelectTrigger className="ui-select w-full">
              <SelectValue placeholder="Select record range" />
            </SelectTrigger>
            <SelectContent className="ui-select">
              <SelectGroup>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="0-500">0-500</SelectItem>
                <SelectItem value="500-1000">500-1000</SelectItem>
                <SelectItem value="1000+">1000+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Upload Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Date
          </label>
          <Select
            value={selectedUploadDate || 'None'}
            onValueChange={(value) => setSelectedUploadDate(value)}
          >
            <SelectTrigger className="ui-select w-full">
              <SelectValue placeholder="Select upload date" />
            </SelectTrigger>
            <SelectContent className="ui-select">
              <SelectGroup>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
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

export default FilterListsDropdown;
