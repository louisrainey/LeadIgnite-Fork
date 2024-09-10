'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadDataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/constants/data';
import { Plus, Filter, Calendar, ChevronDown } from 'lucide-react'; // Icons
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import AddLeadModal from '@/components/reusables/modals/leadModal';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue
} from '@/components/ui/select'; // ShadCN Select component
import Lottie from 'lottie-react';
import searchAnimation from '@/public/lottie/SearchPing.json'; // Lottie JSON file path

interface ProductsClientProps {
  data: Lead[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter dropdown visibility
  const [searchKey, setSearchKey] = useState(''); // Local state to manage search key

  // Filter state
  const [selectedCampaign, setSelectedCampaign] = useState<
    string | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const applyFilter = () => {
    // Apply filter logic here
    console.log('Applying Filter:', { selectedCampaign, selectedStatus });
    setIsFilterOpen(false); // Close the dropdown after applying the filter
  };

  const resetFilter = () => {
    setSelectedCampaign(undefined);
    setSelectedStatus(undefined);
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
            <Plus className="mr-2" /> Create Lead
          </Button>

          <div className="flex space-x-2">
            {/* Today's Follow Ups Button */}
            <Button variant="outline" className="border-blue-600 text-blue-600">
              <Calendar className="mr-2" />
              Today`s Follow Ups
            </Button>

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

              {isFilterOpen && (
                <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                  <div className="space-y-4 p-4">
                    {/* Campaign Select using ShadCN Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Campaign
                      </label>
                      <Select
                        value={selectedCampaign}
                        onValueChange={setSelectedCampaign}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select campaign(s)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="campaign1">
                              Campaign 1
                            </SelectItem>
                            <SelectItem value="campaign2">
                              Campaign 2
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Select using ShadCN Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status(es)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                      <Button variant="default" onClick={applyFilter}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Lead Data Table */}
      {data.length > 1 ? (
        // Show the data table if there is more than 1 lead
        <LeadDataTable searchKey="name" columns={columns} data={data} />
      ) : (
        // Show the Lottie animation and 'Create Lead' button if no leads exist
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
            <Plus className="mr-2" /> Create Lead
          </Button>
        </div>
      )}
      {/* Add Lead Modal - Only show if isModalOpen is true */}
      <AddLeadModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default UserClient;
