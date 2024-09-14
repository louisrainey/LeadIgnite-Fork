'use client'; // Ensure that the component is a client-side component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Menu } from 'lucide-react'; // Icons
import Lottie from 'lottie-react';
import searchAnimation from '@/public/lottie/SearchPing.json'; // Lottie JSON file path
import { LeadListDataTable } from './lead-list-data-table';
import UploadListModal from '@/components/reusables/modals/uploadSkipTracedList';
import { useLeadListStore } from '@/lib/stores/leadList';
import { columns } from './columns';
import LeadListFilterDropdown from './utils/filterLeads';

export const LeadListClient: React.FC = () => {
  const {
    filteredLeadLists, // Filtered data from the store
    filterByRecordsRange,
    filterByUploadDate,
    resetFilters,
    exportFilteredLeadListsToZip
  } = useLeadListStore(); // Use Zustand store

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [searchKey, setSearchKey] = useState(''); // State for search key

  // Dropdown filter state
  const [selectedRecordRange, setSelectedRecordRange] = useState<
    'all' | '0-500' | '500-1000' | '1000+' | undefined
  >(undefined); // Record range filter
  const [selectedUploadDate, setSelectedUploadDate] = useState<
    'all' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days' | undefined
  >(undefined); // Upload date filter

  // Open/close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Apply the filters
  const applyFilter = () => {
    if (selectedRecordRange) filterByRecordsRange(selectedRecordRange);
    if (selectedUploadDate) filterByUploadDate(selectedUploadDate);
  };

  // Reset the filters
  const resetFilter = () => {
    setSelectedRecordRange(undefined);
    setSelectedUploadDate(undefined);
    resetFilters(); // Reset the store filters
  };

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Heading Component */}
        <Heading
          title={`Lead Manager (${filteredLeadLists.length})`}
          description="See a list of existing lead lists or upload a new list."
        />

        {/* Right-aligned buttons */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-4">
            {/* Import List Button */}
            <Button
              onClick={openModal}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              <Menu className="mr-2" /> Import List
            </Button>

            {/* Export Filtered Lead Lists Button */}
            <Button
              onClick={exportFilteredLeadListsToZip}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              <Plus className="mr-2" /> Export Filtered Lead Lists
            </Button>
          </div>

          <div className="flex space-x-2">
            {/* Filter Dropdown */}
            <LeadListFilterDropdown
              selectedRecordsRange={selectedRecordRange}
              setSelectedRecordsRange={setSelectedRecordRange}
              selectedUploadDate={selectedUploadDate}
              setSelectedUploadDate={setSelectedUploadDate}
              resetFilter={resetFilter}
              applyFilter={applyFilter}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Lead Data Table */}
      {filteredLeadLists.length > 0 ? (
        <LeadListDataTable
          pageCount={10}
          searchKey={searchKey}
          columns={columns}
          data={filteredLeadLists} // Use filtered data from the store
        />
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <Lottie animationData={searchAnimation} loop autoplay />
          <h2 className="mt-6 text-xl font-semibold">No Lead Lists Found</h2>
          <p className="mt-2 text-gray-500">
            Upload a new lead list to get started.
          </p>
          <Button
            onClick={openModal}
            className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <Menu className="mr-2" /> Import List
          </Button>
        </div>
      )}

      {/* Add Lead Modal */}
      <UploadListModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LeadListClient;
