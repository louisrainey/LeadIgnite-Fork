'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadDataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/constants/data';
import { Plus, CheckCheck } from 'lucide-react'; // Import Plus or CheckCheck based on your design
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import AddLeadModal from '@/components/reusables/modals/leadModal';

interface ProductsClientProps {
  data: Lead[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(''); // Local state to manage search key

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Heading Component */}
        <Heading
          title={`Lead Manager (${data.length})`}
          description="See a list of existing leads and follow ups, or create new leads."
        />
        <div className="flex items-center justify-between py-4">
          {/* Search Input */}
          <Input
            placeholder="Search leads..."
            value={searchKey}
            onChange={(event) => setSearchKey(event.target.value)}
            className="w-full md:max-w-sm"
          />

          {/* Button to open the Add Lead Modal */}
          <Button onClick={openModal} variant="default" className="ml-4">
            <Plus className="mr-2" />{' '}
            {/* Use Plus or CheckCheck icon based on preference */}
            Create Lead
          </Button>
        </div>
      </div>

      <Separator />

      {/* Lead Data Table */}
      <LeadDataTable searchKey="name" columns={columns} data={data} />

      {/* Add Lead Modal - Only show if isModalOpen is true */}
      <AddLeadModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default UserClient;
