'use client'; // Ensure that the component is a client-side component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Filter, ChevronDown, Menu } from 'lucide-react'; // Icons
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import AddLeadModal from '@/components/reusables/modals/leadModal';
import Lottie from 'lottie-react';
import searchAnimation from '@/public/lottie/SearchPing.json'; // Lottie JSON file path
import FilterListsDropdown from './utils/filterLeads'; // Import the filter component
import { LeadListDataTable } from './lead-data-table';
import { LeadList } from '@/constants/dashboard/leadList';

interface LeadListClientProps {
  data: LeadList[];
}

export const LeadListClient: React.FC<LeadListClientProps> = ({ data }) => {
  const router = useRouter();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter dropdown visibility
  const [searchKey, setSearchKey] = useState(''); // Local state to manage search key

  // Filter state
  const [selectedListName, setSelectedListName] = useState<string | undefined>(
    undefined
  ); // List name filter
  const [selectedRecordRange, setSelectedRecordRange] = useState<
    string | undefined
  >(undefined); // Record range filter
  const [selectedUploadDate, setSelectedUploadDate] = useState<
    string | undefined
  >(undefined); // Upload date filter

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  // Apply the filter (you can customize this to apply filters to your lead lists)
  const applyFilter = () => {
    console.log('Applying Filter:', {
      selectedListName,
      selectedRecordRange,
      selectedUploadDate
    });
    setIsFilterOpen(false); // Close the dropdown after applying the filter
  };

  // Reset the filter state to default values
  const resetFilter = () => {
    setSelectedListName(undefined);
    setSelectedRecordRange(undefined);
    setSelectedUploadDate(undefined);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Heading Component */}
        <Heading
          title={`Lead Manager (${data.length})`}
          description="See a list of existing leads and follow ups, or create new leads."
        />

        {/* Right-aligned buttons */}
        <div className="flex flex-col space-y-2">
          {/* Create Lead Button */}
          <Button
            onClick={openModal}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <Menu className="mr-2" /> Import List
          </Button>

          <div className="flex space-x-2">
            {/* Filter Button with Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600"
                onClick={toggleFilter}
              >
                <Filter className="mr-2" />
                Filter
                <ChevronDown className="ml-2" />
              </Button>

              {/* Dropdown for Filters */}
              {isFilterOpen && (
                <FilterListsDropdown
                  selectedListName={selectedListName}
                  setSelectedListName={setSelectedListName}
                  selectedRecordRange={selectedRecordRange}
                  setSelectedRecordRange={setSelectedRecordRange}
                  selectedUploadDate={selectedUploadDate}
                  setSelectedUploadDate={setSelectedUploadDate}
                  resetFilter={resetFilter}
                  applyFilter={applyFilter}
                  closeDropdown={() => setIsFilterOpen(false)} // Close dropdown
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Lead Data Table */}
      {data.length > 1 ? (
        <LeadListDataTable searchKey="Lists" columns={columns} data={data} />
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <Lottie animationData={searchAnimation} loop autoplay />
          <h2 className="mt-6 text-xl font-semibold">Create New Lead</h2>
          <p className="mt-2 text-gray-500">
            Click the button below to get started.
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
      <AddLeadModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LeadListClient;
